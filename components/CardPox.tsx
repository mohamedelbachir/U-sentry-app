import { StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { router } from "expo-router";
import { Card } from "react-native-paper";
import { postType } from "@/utils/types";

const CardPost = ({ id, title, description, hash, imageURL }: postType) => {
  return (
    <Pressable onPress={() => router.push("/admin/post/" + id)}>
      <Card style={styles.card} mode="elevated">
        <Image
          style={styles.image}
          source={imageURL}
          placeholder={hash}
          contentFit="cover"
          transition={1000}
        />
        <Card.Title title={title} titleVariant="headlineSmall" />
        <Card.Content>
          <Text
            textBreakStrategy="balanced"
            ellipsizeMode="middle"
            lineBreakMode="middle"
            numberOfLines={2}
          >
            {description}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 4,
    width: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: 200,
    backgroundColor: "#0553",
  },
});
export default CardPost;
