import { View, Text, useColorScheme, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import React from "react";

import { PaperProvider } from "react-native-paper";
import { colorThemes } from "@/utils/utility";
import AuthProvider from "@/provider/AuthProvider";
const RootLayout = () => {
  const theme = colorThemes["blue" || "paper"];
  const systemColorScheme = useColorScheme() || "light";
  const colorScheme = systemColorScheme;
  return (
    <PaperProvider theme={theme[colorScheme]}>
      <AuthProvider>
        <Stack screenOptions={{ animation: "slide_from_right" }} />
      </AuthProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default RootLayout;
