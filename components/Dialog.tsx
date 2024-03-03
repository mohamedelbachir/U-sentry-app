import * as React from "react";
import {
  ActivityIndicator,
  Platform,
  View,
  StyleSheet,
  Text,
} from "react-native";
import {
  MD2Colors,
  Portal,
  Dialog,
  useTheme,
  MD3Colors,
} from "react-native-paper";

const isIOS = Platform.OS === "ios";

const DialogComponent = ({
  visible,
  titre,
}: {
  visible: boolean;
  titre: string;
}) => {
  const { isV3 } = useTheme();
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title>{titre}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.flexing}>
            <ActivityIndicator
              color={isV3 ? MD3Colors.tertiary30 : MD2Colors.indigo500}
              size={isIOS ? "large" : 48}
              style={styles.marginRight}
            />
            <Text>en cours.....</Text>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  flexing: {
    flexDirection: "row",
    alignItems: "center",
  },
  marginRight: {
    marginRight: 16,
  },
});

export default DialogComponent;
