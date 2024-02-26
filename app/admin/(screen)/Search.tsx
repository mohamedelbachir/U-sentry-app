import { View, Text } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Appbar } from "react-native-paper";
import ScreenWrapper from "@/utils/screenWrapper";

const Search = () => {
  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          title: "search",
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.back()} />
      </Appbar.Header>
      <Text>Search</Text>
    </ScreenWrapper>
  );
};

export default Search;
