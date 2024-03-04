import { View, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "@/utils/screenWrapper";
import { FAB, ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";
import CardPost from "@/components/CardPox";
import { usePostList } from "@/app/api/post";
import { supabase } from "@/supabase/initSupabase";
import { useQueryClient } from "react-query";
const News = () => {
  const postData = usePostList();
  const clientQuery = useQueryClient();
  useEffect(() => {
    const alertes = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "alertes" },
        (payload) => {
          clientQuery.invalidateQueries(["posts"]);
          clientQuery.invalidateQueries(["user-list"]);
          clientQuery.invalidateQueries(["notification-list"]);
        }
      )
      .subscribe();
    return () => {
      alertes.unsubscribe();
    };
  }, []);
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
          {postData.data.map((d) => (
            <CardPost {...d} key={d.id} />
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
