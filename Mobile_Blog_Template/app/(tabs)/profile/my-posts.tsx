import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Api } from "../../../constants/api";
import { getAuthToken, getCurrentUserId } from "../../../constants/auth";

const MY_POSTS: Post[] = [];

type Post = {
  id: string;
  title: string;
  status: "published" | "draft";
  image: string;
};

const PostRow = ({ item, onDelete }: { item: Post; onDelete: (id: string) => void }) => (
  <View style={styles.postRow}>
    <Image source={{ uri: item.image }} style={styles.postImage} />
    <View style={styles.postInfo}>
      <Text style={styles.postTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              item.status === "published" ? "#4ade80" : "#facc15",
          },
        ]}
      >
        <Text style={styles.statusText}>
          {item.status === "published" ? "Đã xuất bản" : "Bản nháp"}
        </Text>
      </View>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity onPress={() => router.push(`/profile/edit-post?postId=${item.id}`)}>
        <Ionicons name="pencil-outline" size={22} color="#3b82f6" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Ionicons name="trash-outline" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function MyPostsScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMine = async () => {
      const token = getAuthToken();
      const userId = getCurrentUserId();
      if (!token || !userId) {
        setError("Vui lòng đăng nhập để xem bài viết của bạn");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await Api.getMyArticles(token, userId);
        if (!isMounted) return;
        const mapped: Post[] = (res?.data || res || []).map((a: any) => ({
          id: String(a.id ?? a._id ?? a.articleId ?? a.slug ?? Math.random()),
          title: a.title ?? "",
          status: (a.status ?? (a.published ? "published" : "draft")) as "published" | "draft",
          image: a.thumbnail ?? a.image ?? a.coverImage ?? "https://picsum.photos/400/300",
        }));
        setPosts(mapped);
      } catch (e: any) {
        setError(e?.message || "Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchMine();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = (postId: string) => {
    Alert.alert("Xóa", "Bạn có chắc muốn xóa bài viết này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          const token = getAuthToken();
          if (!token) return;
          try {
            await Api.deleteArticle(token, postId);
            setPosts((prev) => prev.filter((p) => p.id !== postId));
          } catch (e) {}
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile/create-post")}
            >
              <Ionicons name="add-circle" size={32} color="#22c55e" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList<Post>
        data={posts}
        renderItem={({ item }: { item: Post }) => <PostRow item={item} onDelete={handleDelete} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.emptyText}>Đang tải...</Text>
          ) : error ? (
            <Text style={[styles.emptyText, { color: "red" }]}>{error}</Text>
          ) : (
            <Text style={styles.emptyText}>Bạn chưa có bài viết nào.</Text>
          )
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  postRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  postImage: { width: 80, height: 80, borderRadius: 10 },
  postInfo: { flex: 1, marginLeft: 15 },
  postTitle: { fontSize: 16, fontWeight: "600" },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 8,
  },
  statusText: { fontSize: 12, fontWeight: "bold", color: "white" },
  actions: { flexDirection: "row", gap: 15 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
