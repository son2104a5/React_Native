import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Appbar,
  Searchbar,
  Card,
  Text,
  Button,
  Avatar,
} from "react-native-paper";

const posts = [
  {
    id: "1",
    title: "Cộng đồng React Native",
    subtitle: "Bài viết mới • 5 phút trước",
    image:
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Zalo - Khám phá",
    subtitle: "Gợi ý dành cho bạn",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function ExploreScreen() {
  const [query, setQuery] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header mode="small" elevated>
        <Appbar.Content title="Khám phá" />
        <Appbar.Action icon="bell-outline" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Searchbar
          placeholder="Tìm kiếm"
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />

        <View style={styles.chipsRow}>
          <Button mode="outlined" compact style={styles.chip} icon="fire">
            Nổi bật
          </Button>
          <Button mode="outlined" compact style={styles.chip} icon="star-outline">
            Đề xuất
          </Button>
          <Button mode="outlined" compact style={styles.chip} icon="tag-outline">
            Khuyến mãi
          </Button>
        </View>

        {posts.map((p) => (
          <Card key={p.id} style={styles.card} mode="elevated">
            <Card.Cover source={{ uri: p.image }} />
            <Card.Title
              title={p.title}
              subtitle={p.subtitle}
              left={(props) => <Avatar.Icon {...props} icon="account-group" />}
            />
            <Card.Actions>
              <Button icon="thumb-up-outline">Thích</Button>
              <Button icon="comment-outline">Bình luận</Button>
              <Button icon="share-variant">Chia sẻ</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  search: {
    borderRadius: 12,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    borderRadius: 20,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
});
