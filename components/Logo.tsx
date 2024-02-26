import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image
    source={require("@/assets/images/logo-icon.png")}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    objectFit: "cover",
    marginBottom: 0,
  },
});

export default memo(Logo);
