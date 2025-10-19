import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Api } from "../../../constants/api";

// --- ĐỊNH NGHĨA TYPE ĐỂ DÙNG LẠI ---
interface User {
  name: string;
  avatar: string;
}
interface CommentType {
  id: string;
  user: User;
  text: string;
  time: string;
  likes: number;
  replies: CommentType[];
}

// State API
const DEFAULT_POST = {
  title: "",
  author: { name: "", avatar: "https://i.pravatar.cc/150" },
  image: "https://picsum.photos/800/400",
  content: "",
  likes: 0,
};

// --- COMPONENT CON (ĐÃ CẬP NHẬT) ---
const Comment = ({
  comment,
  level = 0,
  onReply,
}: {
  comment: CommentType;
  level?: number;
  onReply: (comment: CommentType) => void;
}) => (
  <View style={{ marginLeft: level * 20, marginTop: 15 }}>
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: comment.user.avatar }}
        style={styles.commentAvatar}
      />
      <View style={styles.commentBody}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUser}>{comment.user.name}</Text>
          <Text style={styles.commentTime}>{comment.time}</Text>
        </View>
        <Text style={styles.commentText}>{comment.text}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={18} />
            <Text style={styles.actionText}> {comment.likes}</Text>
          </TouchableOpacity>
          {/* Khi nhấn Reply, gọi hàm onReply được truyền từ cha */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onReply(comment)}
          >
            <Ionicons name="chatbubble-outline" size={18} />
            <Text style={styles.actionText}> Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    {comment.replies.map((reply) => (
      <Comment
        key={reply.id}
        comment={reply}
        level={level + 1}
        onReply={onReply}
      />
    ))}
  </View>
);

// --- MÀN HÌNH CHÍNH (ĐÃ CẬP NHẬT) ---
export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState(DEFAULT_POST);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // State để lưu thông tin bình luận đang được trả lời
  const [replyingTo, setReplyingTo] = useState<CommentType | null>(null);
  // State để lưu nội dung đang gõ
  const [commentText, setCommentText] = useState("");
  // Ref để focus vào TextInput
  const inputRef = useRef<TextInput>(null);

  // Hàm được gọi khi nhấn nút "Reply" ở một bình luận
  const handleReplyPress = (comment: CommentType) => {
    setReplyingTo(comment);
    inputRef.current?.focus(); // Tự động focus vào ô nhập liệu
  };

  // Hàm xử lý khi nhấn nút gửi
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;

    if (replyingTo) {
      // Logic gửi trả lời
      Alert.alert(
        "Gửi trả lời",
        `Nội dung: "${commentText}"\nTrả lời cho bình luận ID: ${replyingTo.id} của ${replyingTo.user.name}`
      );
    } else {
      // Logic gửi bình luận mới
      Alert.alert("Gửi bình luận mới", `Nội dung: "${commentText}"`);
    }

    // Reset state sau khi gửi
    setCommentText("");
    setReplyingTo(null);
    Keyboard.dismiss();
  };

  useEffect(() => {
    let isMounted = true;
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const [detailRes, commentsRes] = await Promise.all([
          Api.getArticleById(String(id)),
          Api.getArticleComments(String(id)),
        ]);

        if (!isMounted) return;

        const a = detailRes?.data || detailRes;
        setPost({
          title: a?.title ?? "",
          author: {
            name: a?.author?.name ?? a?.authorName ?? "",
            avatar: a?.author?.avatar ?? a?.authorAvatar ?? "https://i.pravatar.cc/150",
          },
          image: a?.thumbnail ?? a?.image ?? a?.coverImage ?? "https://picsum.photos/800/400",
          content: a?.content ?? a?.body ?? "",
          likes: a?.likes ?? a?.reactions?.likes ?? 0,
        });

        const mappedComments: CommentType[] = (commentsRes?.data || commentsRes || []).map((c: any) => ({
          id: String(c.id ?? c._id ?? Math.random()),
          user: {
            name: c.user?.name ?? c.authorName ?? "",
            avatar: c.user?.avatar ?? c.authorAvatar ?? "https://i.pravatar.cc/150",
          },
          text: c.text ?? c.content ?? "",
          time: c.createdAt ?? "",
          likes: c.likes ?? 0,
          replies: (c.replies || []).map((r: any) => ({
            id: String(r.id ?? r._id ?? Math.random()),
            user: {
              name: r.user?.name ?? r.authorName ?? "",
              avatar: r.user?.avatar ?? r.authorAvatar ?? "https://i.pravatar.cc/150",
            },
            text: r.text ?? r.content ?? "",
            time: r.createdAt ?? "",
            likes: r.likes ?? 0,
            replies: [],
          })),
        }));
        setComments(mappedComments);
      } catch (e: any) {
        setError(e?.message || "Lỗi tải chi tiết bài viết");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <Image
            source={{ uri: post.image }}
            style={styles.detailImage}
          />
          <View style={styles.contentContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.detailTitle}
            >
              {post.title}
            </Text>
            <View style={styles.authorSection}>
              <Image
                source={{ uri: post.author.avatar }}
                style={styles.authorAvatar}
              />
              <Text style={styles.authorName}>{post.author.name}</Text>
            </View>
            {!!error && <Text style={{ color: "red" }}>{error}</Text>}
            {loading ? (
              <Text>Đang tải...</Text>
            ) : (
              <Text style={styles.detailContent}>{post.content}</Text>
            )}
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>
              Bình luận ({comments.length})
            </Text>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReplyPress}
              />
            ))}
          </View>
        </ScrollView>

        {/* --- PHẦN NHẬP LIỆU ĐÃ CẬP NHẬT --- */}
        <View style={styles.commentInputWrapper}>
          {/* Hiển thị thông báo khi đang trả lời bình luận */}
          {replyingTo && (
            <View style={styles.replyingContainer}>
              <Text style={styles.replyingText}>
                Đang trả lời {replyingTo.user.name}
              </Text>
              <TouchableOpacity onPress={() => setReplyingTo(null)}>
                <Ionicons name="close-circle" size={20} color="#888" />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.commentInputContainer}>
            <TextInput
              ref={inputRef}
              placeholder="Viết bình luận..."
              style={styles.commentInput}
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={handleCommentSubmit}>
              <Ionicons name="send" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- STYLESHEET (ĐÃ CẬP NHẬT) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  keyboardAvoidingContainer: {
    // Style mới
    flex: 1,
  },
  detailImage: { width: "100%", height: 250 },
  contentContainer: { padding: 20 },
  detailTitle: { fontSize: 24, fontWeight: "bold" },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  authorAvatar: { width: 40, height: 40, borderRadius: 20 },
  authorName: { marginLeft: 10, fontSize: 16, fontWeight: "600" },
  detailContent: { fontSize: 16, lineHeight: 26, color: "#333" },
  commentsSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  commentsTitle: { fontSize: 18, fontWeight: "bold" },
  commentContainer: { flexDirection: "row" },
  commentAvatar: { width: 35, height: 35, borderRadius: 17.5 },
  commentBody: { flex: 1, marginLeft: 10 },
  commentHeader: { flexDirection: "row", alignItems: "center" },
  commentUser: { fontWeight: "bold" },
  commentTime: { marginLeft: 8, fontSize: 12, color: "gray" },
  commentText: { marginTop: 4 },
  commentActions: { flexDirection: "row", marginTop: 8 },
  actionButton: { flexDirection: "row", alignItems: "center", marginRight: 15 },
  actionText: { marginLeft: 4, color: "gray" },

  // Styles mới cho phần nhập liệu
  commentInputWrapper: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "white",
  },
  replyingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
  },
  replyingText: {
    color: "#666",
    fontStyle: "italic",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
});
