import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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

type SavedPost = {
  id: string;
  title: string;
  author: string;
  image: string;
};

const SAVED_POSTS: SavedPost[] = [];

const SavedPostCard = ({ item, onUnsave }: { item: SavedPost; onUnsave: (id: string) => void }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text
        onPress={() =>
          router.push({
            pathname: "/posts/[id]",
            params: { id: item.id },
          })
        }
        style={styles.cardTitle}
      >
        {item.title}
      </Text>
      <Text style={styles.cardAuthor}>bởi {item.author}</Text>
    </View>
    <TouchableOpacity style={styles.bookmarkButton} onPress={() => onUnsave(item.id)}>
      <Ionicons name="bookmark" size={24} color="#3b82f6" />
    </TouchableOpacity>
  </View>
);

export default function SavedPostsScreen() {
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchSaved = async () => {
      const token = getAuthToken();
      const userId = getCurrentUserId();
      if (!token || !userId) {
        setError("Vui lòng đăng nhập để xem bài viết đã lưu");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await Api.getSavedArticles(token, userId);
        if (!isMounted) return;
        const mapped: SavedPost[] = (res?.data || res || []).map((a: any) => ({
          id: String(a.id ?? a._id ?? a.articleId ?? a.slug ?? Math.random()),
          title: a.title ?? "",
          author: a.author?.name ?? a.authorName ?? "",
          image: a.thumbnail ?? a.image ?? a.coverImage ?? "https://picsum.photos/400/300",
        }));
        setPosts(mapped);
      } catch (e: any) {
        setError(e?.message || "Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUnsave = async (articleId: string) => {
    const token = getAuthToken();
    const userId = getCurrentUserId();
    if (!token || !userId) return;
    try {
      await Api.unsaveArticle(token, userId, articleId);
      setPosts((prev) => prev.filter((p) => p.id !== articleId));
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <SavedPostCard item={item} onUnsave={handleUnsave} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.emptyText}>Đang tải...</Text>
          ) : error ? (
            <Text style={[styles.emptyText, { color: "red" }]}>{error}</Text>
          ) : (
            <Text style={styles.emptyText}>Bạn chưa lưu bài viết nào.</Text>
          )
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  cardImage: { width: 70, height: 70, borderRadius: 8 },
  cardContent: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardAuthor: { fontSize: 14, color: "gray", marginTop: 4 },
  bookmarkButton: { padding: 10 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
