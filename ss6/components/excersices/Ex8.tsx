import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

// Kiểu dữ liệu bài viết
type Post = {
  id: number;
  title: string;
  author: string;
  date: string;
};

// Fake API
const generatePosts = (startId: number, count: number): Post[] => {
  const posts: Post[] = [];
  for (let i = 0; i < count; i++) {
    posts.push({
      id: startId + i,
      title: `Bài viết số ${startId + i}`,
      author: `Tác giả ${startId + i}`,
      date: new Date().toLocaleDateString("vi-VN"),
    });
  }
  return posts;
};

const BlogApp: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // Load initial posts
  useEffect(() => {
    loadMorePosts();
  }, []);

  // Hàm load thêm bài viết
  const loadMorePosts = () => {
    if (loading) return; // tránh load nhiều lần cùng lúc
    setLoading(true);

    setTimeout(() => {
      const newPosts = generatePosts(posts.length + 1, 5); // mỗi lần load 5 bài
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 1500); // giả lập delay API 1.5s
  };

  // Render từng item
  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>
        {item.author} - {item.date}
      </Text>
    </View>
  );

  // Header danh sách
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Danh sách bài viết ({posts.length})
      </Text>
    </View>
  );

  // Footer loading
  const renderFooter = () =>
    loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007bff" />
        <Text style={{ marginLeft: 10 }}>Đang tải thêm...</Text>
      </View>
    ) : null;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.list}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.2} // khi còn 20% thì load thêm
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  header: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  meta: {
    color: "#555",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
});

export default BlogApp;
