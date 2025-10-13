import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import Ex7 from "./Ex7";

interface Task {
    id: number;
    name: string;
}

export default function Ex6() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            name: "Update API Login",
        },
        {
            id: 2,
            name: "Sửa giao diện",
        },
        {
            id: 3,
            name: "Update API Register",
        },
    ]);

    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = () => {
        const newTask: Task = {
            id: Math.ceil(Math.random() * 100000),
            name: inputValue
        };

        // Cập nhật state có giá trị là 1 mảng
        setTasks([...tasks, newTask]);

        setInputValue("");

        Alert.alert("Thành công", "Thêm mới công việc thành công")
    };

    const handleDelete = (id: number) => {
        // Lọc ra những công việc có id khác với id cần xóa
        const filterTask = tasks.filter((task) => task.id != id)

        // Cập nhật state có giá trị là 1 mảng
        setTasks(filterTask);


        Alert.alert('Thành công', 'Xóa công việc thành công')
    }
    return (
        <View>
            <View
                style={{ display: "flex", flexDirection: "row", margin: 20, gap: 8 }}
            >
                <TextInput
                    style={{ borderWidth: 1, borderColor: "#dadada", paddingLeft: 5 }}
                    placeholder="Nhập tên công việc"
                    value={inputValue}
                    onChangeText={setInputValue}
                />
                <Button onPress={handleSubmit} title="Thêm" />
            </View>

            <View>
                {tasks.map((task) => (
                    <Ex7 task={task} onDelete={handleDelete} />
                ))}
            </View>
        </View>
    );
}
