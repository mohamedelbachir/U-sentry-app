import { View, Text } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Appbar } from "react-native-paper";
import ScreenWrapper from "@/utils/screenWrapper";

export default function Favorite() {
  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          title: "favorite",
          headerShown: false,
          animation: "fade",
        }}
      />
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Vos favoris" />
      </Appbar.Header>
      <Text>Favorite</Text>
    </ScreenWrapper>
  );
}
