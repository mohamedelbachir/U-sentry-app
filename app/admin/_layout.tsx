import { View, StyleSheet } from "react-native";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { useAuth } from "@/provider/AuthProvider";

const AdminRootLayout = () => {
  const { session } = useAuth();
  if (session == null) {
    return <Redirect href={"/"} />;
  }
  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default AdminRootLayout;
