import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Appbar, Card } from "react-native-paper";
import { usePostListById } from "@/app/api/post";
import { Image } from "expo-image";
import ScreenWrapper from "@/utils/screenWrapper";

const Post = () => {
  const { id } = useLocalSearchParams();
  const postRef = usePostListById(parseInt(id));
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "search",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      {postRef.isLoading && (
        <View
          style={[
            styles.container,
            { flex: 1, alignItems: "center", justifyContent: "center" },
          ]}
        >
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {postRef.data && (
        <>
          <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => router.back()} />
            <Appbar.Content title={postRef.data.title} />
            <Appbar.Action icon={"bookmark-outline"} />
          </Appbar.Header>
          <View style={[styles.container, { paddingHorizontal: 10 }]}>
            <Image
              style={styles.image}
              source={postRef.data.imageURL}
              placeholder={postRef.data.hash}
              contentFit="cover"
              transition={1000}
            />
            <Text style={{ fontSize: 20 }}>{postRef.data.title} </Text>
            <Text>{postRef.data.description}</Text>
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 200,
    backgroundColor: "#0553",
  },
});
export default Post;
