import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import React from "react";
const AdminRootLayout = () => {
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
