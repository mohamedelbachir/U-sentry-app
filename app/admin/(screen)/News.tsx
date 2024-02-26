import { View, StyleSheet, ScrollView, Text } from "react-native";
import React from "react";
import ScreenWrapper from "@/utils/screenWrapper";
import { Appbar, Chip, FAB } from "react-native-paper";
import { router } from "expo-router";

const News = () => {
  return (
    <>
      <ScreenWrapper>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.chipsContainer}
          contentContainerStyle={styles.chipsContent}
        >
          <Chip
            selected
            onPress={() => {}}
            style={styles.chip}
            showSelectedOverlay
          >
            Latest
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            Popular
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            Interviews
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            Transfers
          </Chip>
          <Chip onPress={() => {}} style={styles.chip}>
            League
          </Chip>
        </ScrollView>
        <Text>Hello world</Text>
        <View style={styles.cardContainer}>
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
        </View>
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
  screen: {
    flex: 1,
  },
  winner: {
    fontWeight: "700",
  },
  listRow: {
    flexDirection: "row",
    marginVertical: 8,
  },
  teamResultRow: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  score: {
    marginRight: 16,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  card: {
    marginHorizontal: 8,
    marginBottom: 8,
  },
  cardContainer: {
    marginBottom: 80,
  },
  chipsContainer: {
    flexDirection: "row",
  },
  chipsContent: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
  chip: {
    marginRight: 8,
  },
});
export default News;
