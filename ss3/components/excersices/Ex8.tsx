import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// Responsive font
const getFontSizes = (width: number) => {
  if (width > 900) {
    return { title: 28, content: 18 };
  } else if (width > 600) {
    return { title: 24, content: 16 };
  } else {
    return { title: 20, content: 14 };
  }
};

export default function ArticleScreen() {
  const [fontSizes, setFontSizes] = useState(getFontSizes(Dimensions.get('window').width));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setFontSizes(getFontSizes(window.width));
    });
    return () => subscription?.remove();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <Image
        source={{ uri: 'https://picsum.photos/800/400' }} // ảnh banner
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Tiêu đề */}
      <Text style={[styles.title, { fontSize: fontSizes.title }]}>
        React Native: Xây dựng ứng dụng di động đa nền tảng
      </Text>

      {/* Thông tin tác giả */}
      <View style={styles.authorRow}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.authorName}>Sơn Nguyễn</Text>
          <Text style={styles.date}>Đăng ngày: 07/09/2025</Text>
        </View>
      </View>

      {/* Nội dung */}
      <Text style={[styles.content, { fontSize: fontSizes.content }]}>
        React Native đã cách mạng hóa lĩnh vực phát triển ứng dụng di động bằng cách cho phép các
        nhà phát triển xây dựng các ứng dụng gốc cho cả iOS và Android từ một cơ sở mã duy nhất.
        Được phát triển bởi Facebook, framework này sử dụng thư viện React, một trong những thư viện
        JavaScript phổ biến nhất để xây dựng giao diện người dùng.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 200,
  },
  title: {
    fontFamily: 'Roboto-Bold', // custom font (cần add font vào project)
    fontWeight: '700',
    margin: 15,
    color: '#222',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  content: {
    fontFamily: 'Merriweather-Regular', // font đọc dễ hơn
    lineHeight: 22,
    marginHorizontal: 15,
    marginBottom: 30,
    color: '#444',
  },
});