import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import api from "../../../services/api";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EmployeeList() {
  const [items, setItems] = useState<any[]>([]);
  const router = useRouter();

  const fetchList = async () => {
    try {
      const res = await api.get("/employees");
      setItems(res.data.data || res.data);
    } catch (err) {
      Alert.alert("Lỗi", "Không tải được danh sách nhân viên");
    }
  };

  useEffect(() => { fetchList(); }, []);

  const confirmDelete = (id: string) => {
    Alert.alert("Xác nhận", "Bạn có muốn xóa nhân viên này?", [
      { text: "Hủy" },
      { text: "Xóa", onPress: async () => {
        try {
          await api.delete(`/employees/${id}`);
          Alert.alert("Đã xóa");
          fetchList();
        } catch (err: any) {
          Alert.alert("Lỗi", err.response?.data?.message || "Xóa thất bại");
        }
      }}
    ]);
  };

  return (
    <View style={{flex:1, backgroundColor:"#fff"}}>
      <FlatList
        data={items}
        keyExtractor={(it)=>it.id.toString()}
        renderItem={({item})=>(
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.fullName} ({item.code})</Text>
              <Text style={styles.pos}>{item.position?.positionName}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={()=>router.push(`/employees/edit/${item.id}`)}>
                <Ionicons name="pencil-outline" size={22} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>confirmDelete(item.id)} style={{marginLeft:12}}>
                <Ionicons name="trash-outline" size={22} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={()=>router.push("/employees/add")}>
        <Text style={{color:"#fff", fontSize:22}}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row:{ padding:12, margin:10, backgroundColor:"#f8f8f8", borderRadius:8, flexDirection:"row", justifyContent:"space-between", alignItems:"center" },
  name:{ fontWeight:"700" },
  pos:{ color:"#666" },
  actions:{ flexDirection:"row" },
  fab:{ position:"absolute", right:20, bottom:30, width:56, height:56, borderRadius:28, backgroundColor:"#ff6b6b", justifyContent:"center", alignItems:"center" }
});