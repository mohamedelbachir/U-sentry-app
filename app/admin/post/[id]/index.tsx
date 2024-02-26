import { View, Text, TextInput } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import ScreenWrapper from "@/utils/screenWrapper";
import { Appbar } from "react-native-paper";

const Post = () => {
  const { id } = useLocalSearchParams();
  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          title: "search",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={id} />
        <Appbar.Action icon={"bookmark-outline"} />
      </Appbar.Header>
      <Text>Post :{id}</Text>
    </ScreenWrapper>
  );
};

export default Post;
