import { View, StyleSheet, Text } from "react-native";
import React from "react";
import ScreenWrapper from "@/utils/screenWrapper";
import { FAB, ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";
import CardPost from "@/components/CardPox";
import { usePostList } from "@/app/api/post";
const News = () => {
  const postData = usePostList();
  return (
    <>
      {postData.isLoading && (
        <View style={styles.container}>
          <ActivityIndicator
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
            size={"large"}
          />
        </View>
      )}
      {postData.data && (
        <ScreenWrapper>
          {postData.data.map((d, i) => (
            <CardPost {...d} key={i} />
          ))}
        </ScreenWrapper>
      )}
      {postData.isError && (
        <View style={styles.container}>
          <Text>Erreur de chargement des actu ..</Text>
        </View>
      )}
      {postData.data && (
        <FAB
          icon="magnify"
          onPress={() => {
            router.push("/admin/(screen)/Search");
          }}
          visible
          style={styles.fab}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 4,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
export default News;
