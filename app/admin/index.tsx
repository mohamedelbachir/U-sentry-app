import { Stack, router, useNavigation } from "expo-router";
import React from "react";
import { Easing } from "react-native";
import News from "./(screen)/News";
import Notification from "./(screen)/Notification";
import Account from "./(screen)/Account";
import { Appbar, BottomNavigation, Icon } from "react-native-paper";

import { useSafeAreaInsets } from "react-native-safe-area-context";
type RoutesState = Array<{
  key: string;
  title: string;
  titleInfo: string;
  focusedIcon: string;
  unfocusedIcon?: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
}>;
const Admin = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const { sourceColor, headerTitle, darkMode } = {
    darkMode: null,
    headerTitle: "lol",
    sourceColor: "blue",
  };

  const [routes] = React.useState<RoutesState>([
    {
      key: "alerte",
      title: "Actu",
      titleInfo: "Actualites",
      focusedIcon: "broadcast",
      badge: false,
    },
    {
      key: "notif",
      title: "notification",
      titleInfo: "Vos notificactions",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
      badge: false,
    },
    {
      key: "account",
      title: "Compte",
      titleInfo: "Profil",

      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);
  return (
    <>
      {index != 2 && (
        <Appbar.Header elevated>
          <Appbar.Content title={routes[index].titleInfo} />
          {index == 0 && (
            <Appbar.Action
              icon={"bookmark-outline"}
              onPress={() => router.push("/admin/(screen)/Favorite")}
            />
          )}
        </Appbar.Header>
      )}
      <BottomNavigation
        safeAreaInsets={{ bottom: insets.bottom }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        labelMaxFontSizeMultiplier={2}
        renderScene={BottomNavigation.SceneMap({
          alerte: News,
          notif: Notification,
          account: Account,
        })}
        sceneAnimationEnabled
        sceneAnimationType={"shifting"}
        sceneAnimationEasing={Easing.ease}
        getLazy={({ route }) => route.key !== "album"}
      />
    </>
  );
};

export default Admin;
