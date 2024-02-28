import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Card } from "react-native-paper";
import { postType } from "@/utils/types";

const CardPost = ({ title, id, description, imageURL }: postType) => {
  return (
    <Pressable onPress={() => router.push(`/admin/post/${id}`)}>
      <Card style={styles.card} mode="elevated">
        <Card.Cover source={undefined} style={{ height: 100 }} />
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
  },
});
export default CardPost;
