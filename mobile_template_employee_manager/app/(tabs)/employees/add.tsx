import React from "react";
import { View } from "react-native";
import EmployeeForm from "../../../components/EmployeeForm";
import { useRouter } from "expo-router";

export default function AddEmployee() {
  const router = useRouter();
  return (
    <View style={{flex:1}}>
      <EmployeeForm mode="add" onSuccess={()=>router.back()} />
    </View>
  );
}
