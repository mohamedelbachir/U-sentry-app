import { StyleSheet, Text, Keyboard } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Appbar, Searchbar } from "react-native-paper";
import ScreenWrapper from "@/utils/screenWrapper";
import TextInput from "@/components/TextInput";

const Search = () => {
  const [searchQueries, setSearchQuery] = React.useState({
    searchBarMode: "",
    traileringIcon: "",
    traileringIconWithRightItem: "",
    rightItem: "",
    loadingBarMode: "",
    searchViewMode: "",
    searchWithoutBottomLine: "",
    loadingViewMode: "",
    clickableBack: "",
    clickableDrawer: "",
    clickableLoading: "",
  });
  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          title: "search",
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Appbar.Header elevated>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) =>
            setSearchQuery({
              ...searchQueries,
              clickableBack: query,
            })
          }
          value={searchQueries.clickableBack}
          onIconPress={() => {
            Keyboard.dismiss();
            router.back();
          }}
          onClearIconPress={() => {
            Keyboard.dismiss();
          }}
          style={styles.searchbar}
          icon={{ source: "arrow-left", direction: "auto" }}
        />
      </Appbar.Header>

      <Text>Search</Text>
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({
  searchbar: {
    margin: 4,
    borderRadius: 30,
    width: "100%",
  },
});

export default Search;
