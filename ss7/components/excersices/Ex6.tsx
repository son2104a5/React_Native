import React, { createContext, useContext, useState } from "react";
import { View, Text, StyleSheet, Switch, SafeAreaView } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme phải được dùng trong ThemeProvider");
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ChildBox: React.FC = () => {
  const { theme } = useTheme();
  const styles = themedStyles(theme);

  return (
    <View style={styles.box}>
      <Text style={styles.text}>Tôi là Component Con</Text>
      <GrandChildBox />
    </View>
  );
};

const GrandChildBox: React.FC = () => {
  const { theme } = useTheme();
  const styles = themedStyles(theme);

  return (
    <View style={styles.box}>
      <Text style={styles.text}>Tôi là Component Cháu</Text>
    </View>
  );
};

const Ex6: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const styles = themedStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>🌗 Chế độ hiện tại: {theme}</Text>
      <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      <ChildBox />
    </SafeAreaView>
  );
};

export default Ex6;

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "light" ? "#ffffff" : "#121212",
    },
    box: {
      marginTop: 20,
      padding: 20,
      borderRadius: 10,
      backgroundColor: theme === "light" ? "#f0f0f0" : "#1e1e1e",
    },
    text: {
      color: theme === "light" ? "#000000" : "#ffffff",
      fontSize: 16,
    },
});
