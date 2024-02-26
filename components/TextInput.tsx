import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { useTheme } from "react-native-paper";

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextInput = ({ errorText, ...props }: Props) => {
  const theme = useTheme();
  const inputStyle = {
    color: theme.colors.surface,
  };
  const errorStyle = {
    color: theme.colors.error,
  };
  return (
    <View style={styles.container}>
      <Input
        style={[inputStyle]}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="flat"
        {...props}
      />
      {errorText ? (
        <Text style={[styles.error, errorStyle]}>{errorText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
  },
  error: {
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
