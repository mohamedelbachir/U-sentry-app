import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import BackButton from "@/components/BackButton";
import { useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { emailValidator, passwordValidator } from "@/utils/utils";
import { Stack, router } from "expo-router";

const login = () => {
  const theme = useTheme();
  const [step, setStep] = useState(0);
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
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState<string>("");
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [colors, setColors] = useState<string>("");
  const handlePress = () => {
    if (step < 1) {
      setStep((s) => s + 1);
    }
    router.navigate("/admin");
  };
  const genderList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

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

      {step === 0 && (
        <>
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
          <View style={styles.select}>
            <DropDown
              label={"choisir votre faculte"}
              mode={"flat"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender}
              setValue={setGender}
              list={genderList}
              dropDownStyle={{ width: "100%" }}
            />
          </View>
        </>
      )}
      {step === 1 && (
        <>
          <View style={styles.select}>
            <DropDown
              label={"choisir votre departement"}
              mode={"flat"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender}
              setValue={setGender}
              list={genderList}
              dropDownStyle={{ width: "100%" }}
            />
          </View>
          <View style={styles.select}>
            <DropDown
              label={"choisir votre filiere"}
              mode={"flat"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender}
              setValue={setGender}
              list={genderList}
              dropDownStyle={{ width: "100%" }}
            />
          </View>
          <View style={styles.select}>
            <DropDown
              label={"choisir votre niveau"}
              mode={"flat"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender}
              setValue={setGender}
              list={genderList}
              dropDownStyle={{ width: "100%" }}
            />
          </View>
        </>
      )}
      <View style={styles.btnGroup}>
        {step == 1 && (
          <Button
            mode="outlined"
            onPress={_onLoginPressed}
            style={{ borderRadius: 30, width: "auto" }}
            onPressIn={() => setStep((s) => s - 1)}
          >
            Retour
          </Button>
        )}
        <Button
          mode="contained"
          onPress={_onLoginPressed}
          style={{ borderRadius: 30, width: step == 1 ? "auto" : "100%" }}
          onPressIn={handlePress}
        >
          {step === 0 ? "Suivant" : "Creer votre compte"}
        </Button>
      </View>

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
  containerStyle: {
    flex: 1,
  },
  btnGroup: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  select: { width: "100%", marginVertical: 5 },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
});

export default login;
