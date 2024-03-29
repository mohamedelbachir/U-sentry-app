import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Paragraph from "@/components/Paragraph";
import { Redirect, Stack, router } from "expo-router";
import { useTheme, ActivityIndicator } from "react-native-paper";
import { useAuth } from "@/provider/AuthProvider";

const WelcomeScreen = () => {
  const theme = useTheme();
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (session != null) {
    return <Redirect href={"/admin/"} />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "welcome",
          headerShown: false,
          animation: "simple_push",
        }}
      />
      <Background>
        <Logo />
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          U-sentry
        </Text>
        <Paragraph>Une application de veille pres de vous</Paragraph>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => router.push("/login")}
        >
          Connectez-vous
        </Button>
        <Button
          mode="outlined"
          style={styles.btn}
          onPress={() => router.push("/signUp")}
        >
          Creez un compte
        </Button>
      </Background>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    borderRadius: 30,
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
export default WelcomeScreen;
