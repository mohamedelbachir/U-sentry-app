import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import BackButton from "@/components/BackButton";
import { useTheme } from "react-native-paper";
import { emailValidator, passwordValidator } from "@/utils/utils";
import { Stack, router } from "expo-router";
import { supabase } from "@/supabase/initSupabase";
import { isWeb } from "@/utils/utility";

const login = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    handleSignUp();
  };
  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) {
      Alert.alert(error.message);
      if (isWeb) console.log(error.message);
    }
    setLoading(false);
  };

  return (
    <Background>
      <Stack.Screen
        options={{
          title: "log in",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <BackButton goBack={() => router.back()} />
      <Logo />
      <Header>Bienvenue</Header>

      <TextInput
        label="Email"
        placeholder="email@gmail.com"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        //autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="mot de passe"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={_onLoginPressed}
        style={{ borderRadius: 30 }}
        loading={loading}
      >
        Se connecter
      </Button>

      <View style={styles.row}>
        <Text>Vous n'avez pas de compte ?</Text>
        <TouchableOpacity onPress={() => router.navigate("/signUp")}>
          <Text style={[styles.link, { color: theme.colors.primary }]}>
            Creez
          </Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "space-between",
  },
  link: {
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default memo(login);
