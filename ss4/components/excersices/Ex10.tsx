import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Switch, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Product {
  id: string;
  name: string;
  category: string;
  inStock: boolean;
}

// Danh sách sản phẩm gốc - immutable, không thay đổi
const ORIGINAL_PRODUCTS: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', category: 'Điện tử', inStock: true },
  { id: '2', name: 'Áo thun nam', category: 'Thời trang', inStock: true },
  { id: '3', name: 'Nồi chiên không dầu', category: 'Gia dụng', inStock: false },
  { id: '4', name: 'MacBook Air M3', category: 'Điện tử', inStock: true },
  { id: '5', name: 'Quần Jeans nữ', category: 'Thời trang', inStock: true },
  { id: '6', name: 'Máy lọc không khí', category: 'Gia dụng', inStock: true },
  { id: '7', name: 'Tai nghe Sony WH-1000XM5', category: 'Điện tử', inStock: true },
  { id: '8', name: 'Giày dung', category: 'Thời trang', inStock: false }, // Thêm vài cái cho đa dạng
  { id: '9', name: 'Tủ lạnh', category: 'Gia dụng', inStock: true },
];

const ProductListScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isStockOnly, setIsStockOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Lấy danh sách danh mục unique từ data gốc + option 'Tất cả'
  const categories = useMemo(() => {
    const uniqueCats = [...new Set(ORIGINAL_PRODUCTS.map(p => p.category))];
    return ['Tất cả', ...uniqueCats];
  }, []);

  // Derived filtered list - cập nhật auto khi states thay đổi
  const filteredProducts = useMemo(() => {
    return ORIGINAL_PRODUCTS.filter(product => {
      // Tìm kiếm theo tên (case insensitive)
      const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());

      // Lọc còn hàng
      const matchesStock = !isStockOnly || product.inStock;

      // Lọc danh mục
      const matchesCategory = selectedCategory === 'Tất cả' || selectedCategory === '' || product.category === selectedCategory;

      return matchesSearch && matchesStock && matchesCategory;
    });
  }, [searchText, isStockOnly, selectedCategory]);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productCategory}>Danh mục: {item.category}</Text>
      <Text style={[styles.productStock, { color: item.inStock ? 'green' : 'red' }]}>
        {item.inStock ? 'Còn hàng' : 'Hết hàng'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm theo tên sản phẩm..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.filterRow}>
        <Text style={styles.switchLabel}>Chỉ hiển thị hàng còn trong kho</Text>
        <Switch
          value={isStockOnly}
          onValueChange={setIsStockOnly}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Lọc theo danh mục:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map(cat => (
            <Picker.Item key={cat} label={cat} value={cat === 'Tất cả' ? '' : cat} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có sản phẩm nào khớp</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  productCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  productStock: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});

export default ProductListScreen;