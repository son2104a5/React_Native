import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "@/services/api";
import EmployeeForm from "@/components/EmployeeForm";

export default function EditEmployee() {
  const { id } = useLocalSearchParams();
  const [initial, setInitial] = useState<any>(null);
  const router = useRouter();

  useEffect(()=> {
    api.get(`/employees/${id}`).then(res => setInitial(res.data.data || res.data)).catch(()=>null);
  }, [id]);

  if (!initial) return <ActivityIndicator style={{flex:1}}/>;

  return (
    <View style={{flex:1}}>
      <EmployeeForm mode="edit" id={String(id)} initial={initial} onSuccess={()=>router.back()} />
    </View> 
  );
}



