import React, { PropsWithChildren, memo } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = ({ width }: { width?: number }) => (
  <Image
    source={require("@/assets/images/logo-icon.png")}
    style={[styles.image]}
    width={width}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    objectFit: "contain",
    marginBottom: 0,
  },
});

export default memo(Logo);
