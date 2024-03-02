import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import ScreenWrapper from "@/utils/screenWrapper";
import { FAB, useTheme, ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";
import CardPost from "@/components/CardPox";
import { usePostList } from "@/app/api/post";
const News = () => {
  const theme = useTheme();
  const postData = usePostList();
  return (
    <>
      <ScreenWrapper style={{ flex: 1 }}>
        {postData.isLoading && (
          <View>
            <ActivityIndicator
              style={{ justifyContent: "center", marginTop: 30 }}
              size={"large"}
            />
          </View>
        )}
        {postData.data && (
          <View
            style={[
              styles.container,
              { backgroundColor: theme.colors?.background },
            ]}
          >
            {postData.data.map((d, i) => (
              <CardPost {...d} key={i} />
            ))}
          </View>
        )}
      </ScreenWrapper>
      {!postData.isLoading && (
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
