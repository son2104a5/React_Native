import { ArrowLeft, Heart, Star } from "lucide-react-native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProductDetail() {
  return (
    <>
      <ScrollView>
        <View>
          <ArrowLeft style={[styles.arrowLeft, styles.backgroundOverlay]} />
          <Heart style={[styles.heart, styles.backgroundOverlay]} />
          {/* Phạm vi của hình ảnh */}
          <Image
            style={styles.imageContainer}
            source={{
              uri: "https://bizweb.dktcdn.net/100/466/874/products/1-jpeg-7eca20b2-1b24-4c26-8170-fe5cf0a5cb0c.jpg?v=1734949218997",
            }}
          />
        </View>
        <View style={{ padding: 10 }}>
          {/* Phạm vi của tên sản phẩm */}
          <Text style={styles.productName}>Giày Second Sunday Chunky Low</Text>

          {/* Phạm vi của phần đánh giá */}
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
          >
            <Star color={"yellow"} />
            <Text style={{ paddingRight: 5 }}>4.9</Text>
            <Text style={{ color: "gray" }}>|</Text>
            <Text style={{ color: "gray", paddingLeft: 5 }}>200 Đánh giá</Text>
          </View>

          {/* Phạm vi phần giá */}
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "red",
                paddingRight: 10,
              }}
            >
              1.210.000đ
            </Text>
            <Text style={{ color: "gray", textDecorationLine: "line-through" }}>
              1.840.000đ
            </Text>
          </View>

          {/* Phạm vi phần chọn kích thước */}
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 16 }}>
              Chọn kích thước
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 8,
              }}
            >
              <Text style={styles.size}>38</Text>
              <Text style={styles.size}>39</Text>
              <Text style={styles.size}>40</Text>
              <Text style={styles.size}>41</Text>
              <Text style={styles.size}>42</Text>
            </View>
          </View>

          {/* Phạm vi phần mô tả */}
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 24 }}>
              Mô tả
            </Text>
            <Text
              style={{
                width: 380,
                color: "gray",
                marginTop: 8,
                marginBottom: 12,
              }}
            >
              Lấy cảm hứng từ những đôi giày bóng rổ thập niên 70, kết hợp với
              yếu tố chunky phần đế của những đôi sneaker hiện đại. - Thiết kế
              hiện đại: Sự kết hợp giữa hiện đại và retro này sẽ giúp bạn "thích
              ứng" được trong mọi hoàn cảnh.
            </Text>
          </View>

          {/* Phạm vi phần nút bấm */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingTop: 8,
              borderTopColor: "#dadada",
              borderTopWidth: 1
            }}
          >
            <Pressable style={[styles.button, styles.buttonCustomLeft]}>
              Thêm vào giỏ
            </Pressable>
            <Pressable style={[styles.button, styles.buttonCustomRight]}>
              Mua ngay
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: 400,
    height: 400,
  },
  arrowLeft: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1000,
    color: "white",
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
    color: "red",
  },
  backgroundOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 32,
    width: 32,
    position: "absolute",
    top: 10,
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    padding: 5,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  size: {
    borderColor: "#dadada",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: 40,
    textAlign: "center",
  },
  button: {
    padding: 10,
    width: 180,
    textAlign: "center",
  },
  buttonCustomLeft: {
    borderColor: "blue",
    borderWidth: 2,
    color: "blue",
    borderRadius: 8,
  },
  buttonCustomRight: {
    backgroundColor: "blue",
    color: "white",
    borderRadius: 8,
  },
});
