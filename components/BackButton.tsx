import React, { memo } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={goBack}
      style={[styles.container, { top: insets.top + 20 }]}
    >
      <Image
        style={styles.image}
        source={require("@/assets/images/arrow_back.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
