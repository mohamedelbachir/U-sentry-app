import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "@/utils/screenWrapper";
import {
  Card,
  Button,
  FAB,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { router } from "expo-router";
import CardPost from "@/components/CardPox";
import { postType } from "@/utils/types";
import { usePostList } from "@/app/api/post";
const News = () => {
  const theme = useTheme();
  const postData = usePostList();
  return (
    <>
      <ScreenWrapper>
        {postData.isLoading && <ActivityIndicator size={"large"} />}
        {postData.data && (
          <ScrollView
            style={[
              styles.container,
              { backgroundColor: theme.colors?.background },
            ]}
            contentContainerStyle={styles.content}
          >
            <CardPost description={"lorem ipsu ...."} title="simple " id={1} />
          </ScrollView>
        )}

        {/* 
      <Card style={styles.card} mode="elevated">
        <Card.Cover source={require("@/assets/images/players.jpg")} />
        <Card.Title
          title="Winter transfer window"
          titleVariant="headlineMedium"
        />
        <Card.Content>
          <Text>
            Which soccer players are switching teams? From the Premier
            League, La Liga and beyond, here is a list of players on the
            move this summer.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => {}}>Share</Button>
          <Button onPress={() => {}}>Read more</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card} mode="contained">
        <Card.Cover source={require("@/assets/images/players-2.jpg")} />
        <Card.Title
          title="John Doe's injury"
          titleVariant="headlineMedium"
        />
        <Card.Content>
          <Text>
            Medical tests show that Doe has injured the tendon in his left
            hamstring, and in the next few days will...
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => {}}>Share</Button>
          <Button onPress={() => {}}>Read more</Button>
        </Card.Actions>
      </Card>
     */}
      </ScreenWrapper>
      <FAB
        icon="magnify"
        onPress={() => {
          router.push("/admin/(screen)/Search");
        }}
        visible
        style={styles.fab}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
  chip: {
    margin: 4,
  },
  preference: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  button: {
    borderRadius: 12,
  },
  customCardRadius: {
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  customCoverRadius: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 24,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
export default News;
