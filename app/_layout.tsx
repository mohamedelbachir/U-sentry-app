import { View, Text, useColorScheme, StyleSheet } from "react-native";
import { Redirect, Stack } from "expo-router";
import React from "react";

import { PaperProvider } from "react-native-paper";
import { colorThemes } from "@/utils/utility";
import AuthProvider, { useAuth } from "@/provider/AuthProvider";
import QueryProvider from "@/provider/QueryProvider";
const RootLayout = () => {
  const theme = colorThemes["blue" || "paper"];
  const systemColorScheme = useColorScheme() || "light";
  const colorScheme = systemColorScheme;
  return (
    <PaperProvider theme={theme[colorScheme]}>
      <QueryProvider>
        <AuthProvider>
          <Stack screenOptions={{ animation: "fade" }} />
        </AuthProvider>
      </QueryProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default RootLayout;
