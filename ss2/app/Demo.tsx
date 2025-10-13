import React from "react";
import { Button, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function Demo() {
    return (
        <>
            <ScrollView>
                <Text>Component Demo</Text>
                <Image
                    source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
                    height={300}
                />
                <Text>Component ImageBackground</Text>
                <ImageBackground
                    height={300}
                    source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
                >
                    <Text
                        style={{ color: "white", fontSize: 30, textAlign: "center" }}
                    >
                        Inside ImageBackground</Text>
                </ImageBackground>

                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic in quas veritatis amet optio aspernatur earum vitae saepe quam quo est, ratione, minima nam maiores. Id accusantium at porro beatae!
                </Text>

                <Button title="button-1" color="#dadada"></Button>

                <Pressable style={styles.buttonPressable}>
                    <Text style={styles.buttonText}>Pressable</Text>
                </Pressable>

                <TouchableOpacity>
                    <Text style={styles.buttonText}>TouchableOpacity</Text>
                </TouchableOpacity>

                <TextInput style={styles.textInput} />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    buttonPressable: {
        backgroundColor: "blue",
        padding: 10,
        marginTop: 10,
        height: 36
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        lineHeight: 36
    },
    textInput: {
        height: 36,
        borderWidth: 1
    }
});