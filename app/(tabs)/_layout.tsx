import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "home",
          title: "vos alertes",
        }}
      />
      <Tabs.Screen
        name="users/[id]"
        options={{
          headerTitle: "User",
          title: "user",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
