import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/supabase/initSupabase";

const Account = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };
  return (
    <Background>
      <Logo />
      <Header>Oups :(</Header>
      <Text>{session?.user.email}</Text>
      <Paragraph>
        <Text style={{ color: "black" }}>
          Vous voulez deja vous deconnecter :)
        </Text>
      </Paragraph>
      <Button
        mode="outlined"
        style={{ borderRadius: 30 }}
        onPress={handleSignOut}
        loading={loading}
      >
        Logout
      </Button>
    </Background>
  );
};

export default Account;
