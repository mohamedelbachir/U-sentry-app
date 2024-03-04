import { StyleSheet, Text, Keyboard, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import ScreenWrapper from "@/utils/screenWrapper";
import TextInput from "@/components/TextInput";
import { usePostList, useUserNotification } from "@/app/api/post";
import { postType } from "@/utils/types";
import CardPost from "@/components/CardPox";

const Search = () => {
  const [searchQueries, setSearchQuery] = React.useState("");
  const notifications = useUserNotification();
  const postData = usePostList();
  const [datas, setDatas] = useState<postType[]>([]);
  useEffect(() => {
    if (postData.isSuccess && notifications.isSuccess) {
      const inPost = postData.data.filter(
        (f) =>
          f.title.includes(searchQueries) ||
          f.description?.includes(searchQueries)
      );
      const inNof = notifications.data.filter(
        (f) =>
          f.title.includes(searchQueries) ||
          f.description?.includes(searchQueries)
      );
      setDatas([...inPost, ...inNof]);
    }
  }, [searchQueries]);

  return (
    <>
      <Appbar.Header elevated>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQueries}
          onIconPress={() => {
            Keyboard.dismiss();
            router.back();
          }}
          onClearIconPress={() => {
            Keyboard.dismiss();
          }}
          icon={{ source: "arrow-left", direction: "auto" }}
          style={styles.searchbar}
        />
      </Appbar.Header>
      <Stack.Screen
        options={{
          title: "favorite",
          headerShown: false,
          animation: "fade",
        }}
      />
      {(postData.isLoading || notifications.isLoading) && (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {notifications.data &&
        !postData.isLoading &&
        (datas.length == 0 ? (
          <View style={styles.container}>
            <Text>Pas de poste trouver</Text>
          </View>
        ) : (
          <ScreenWrapper>
            {datas.map((d, i) => (
              <CardPost {...d} key={i} />
            ))}
          </ScreenWrapper>
        ))}
      {(notifications.isError || postData.isError) && (
        <View style={styles.container}>
          <Text>Erreur de chargement des post</Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  searchbar: {
    margin: 4,
    borderRadius: 30,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default Search;
