import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import BackButton from "@/components/BackButton";
import { useTheme } from "react-native-paper";
import { emailValidator, passwordValidator } from "@/utils/utils";
import { Stack, router } from "expo-router";

const login = () => {
  const theme = useTheme();
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
    //navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <Stack.Screen
        options={{
          title: "sign up",
          headerShown: false,
        }}
      />
      <BackButton goBack={() => router.back()} />
      <Logo />
      <Header>Creez un compte</Header>

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
      >
        Creer votre compte
      </Button>

      <View style={styles.row}>
        <Text>Vous avez deja de compte ?</Text>
        <TouchableOpacity onPress={() => router.navigate("/login")}>
          <Text style={[styles.link, { color: theme.colors.primary }]}>
            Connectez-vous
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
