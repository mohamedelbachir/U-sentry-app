import { View, Text } from "react-native";
import React from "react";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";
import { router } from "expo-router";

const Account = () => {
  return (
    <Background>
      <Logo />
      <Header>Oups :(</Header>
      <Paragraph>
        <Text style={{ color: "black" }}>
          Vous voulez deja vous deconnecter :)
        </Text>
      </Paragraph>
      <Button
        mode="outlined"
        style={{ borderRadius: 30 }}
        onPress={() => router.navigate("/")}
      >
        Logout
      </Button>
    </Background>
  );
};

export default Account;
