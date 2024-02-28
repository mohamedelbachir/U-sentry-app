import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import BackButton from "@/components/BackButton";
import { ActivityIndicator, useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { emailValidator, passwordValidator } from "@/utils/utils";
import { Stack, router } from "expo-router";
import { supabase } from "@/supabase/initSupabase";
import { isWeb } from "@/utils/utility";
import {
  useDepartementList,
  useFaculteList,
  useFiliereList,
  useNiveauList,
} from "./api/info";
import { useCreateUserClasseMutation } from "./api/account";

type optionProps = {
  label: string;
  value: string;
};

const login = () => {
  const theme = useTheme();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [showFacultyDropDown, setShowFacultyDropDown] = useState(false);
  const [showDepartementDropDown, setShowDepartementDropDown] = useState(false);
  const [showFiliereDropDown, setShowFiliereDropDown] = useState(false);
  const [showNiveauDropDown, setShowNiveauDropDown] = useState(false);
  const [faculty, setFaculty] = useState<string>("");
  const [departement, setDepartement] = useState<string>("");
  const [filiere, setFiliere] = useState<string>("");
  const [niveau, setNiveau] = useState<string>("");
  const faculteData = useFaculteList();
  const departementData = useDepartementList();
  const niveauData = useNiveauList();
  const filiereData = useFiliereList();
  const handlePress = () => {
    setStep((s) => s + 1);
  };
  const checkSignUp = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setStep(0);
      return;
    }
    if (
      faculty === "" ||
      departement === "" ||
      niveau === "" ||
      filiere === ""
    ) {
      setStep(0);
      return;
    }
    handleSignUp()
      .then(() => {
        router.navigate("/admin");
      })
      .catch((e) => {
        setStep(0);
      });
  };

  const facultyList: optionProps[] = faculteData.data?.map((d) => ({
    label: d.nom,
    value: d.faculte_id,
  }));
  const departementList: optionProps[] = departementData.data?.map((d) => ({
    label: d.nom,
    value: d.departement_id,
  }));
  const niveauList: optionProps[] = niveauData.data?.map((d) => ({
    label: d.nom,
    value: d.id,
  }));
  const filiereList: optionProps[] = filiereData.data?.map((d) => ({
    label: d.nom,
    value: d.id,
  }));

  const handleSignUp = async () => {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      Alert.alert(error.message);
      if (isWeb) console.log(error.message);
    } else {
      //
    }
    setLoading(false);
  };
  if (
    filiereData.isLoading ||
    niveauData.isLoading ||
    faculteData.isLoading ||
    departementData.isLoading
  ) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size={"large"} style={{ flex: 1 }} />
      </View>
    );
  }
  return (
    <Background>
      <Stack.Screen
        options={{
          title: "sign up",
          headerShown: false,
          animation: "slide_from_right",
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
              visible={showFacultyDropDown}
              showDropDown={() => setShowFacultyDropDown(true)}
              onDismiss={() => setShowFacultyDropDown(false)}
              value={faculty}
              setValue={setFaculty}
              list={facultyList}
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
              visible={showDepartementDropDown}
              showDropDown={() => setShowDepartementDropDown(true)}
              onDismiss={() => setShowDepartementDropDown(false)}
              value={departement}
              setValue={setDepartement}
              list={departementList}
              dropDownStyle={{ width: "100%" }}
            />
          </View>
          <View style={styles.select}>
            <DropDown
              label={"choisir votre filiere"}
              mode={"flat"}
              visible={showFiliereDropDown}
              showDropDown={() => setShowFiliereDropDown(true)}
              onDismiss={() => setShowFiliereDropDown(false)}
              value={filiere}
              setValue={setFiliere}
              list={filiereList}
              dropDownStyle={{ width: "100%" }}
            />
          </View>
          <View style={styles.select}>
            <DropDown
              label={"choisir votre niveau"}
              mode={"flat"}
              visible={showNiveauDropDown}
              showDropDown={() => setShowNiveauDropDown(true)}
              onDismiss={() => setShowNiveauDropDown(false)}
              value={niveau}
              setValue={setNiveau}
              list={niveauList}
              dropDownStyle={{ width: "100%" }}
            />
          </View>
        </>
      )}
      <View style={styles.btnGroup}>
        {step == 1 && (
          <Button
            mode="outlined"
            style={{ borderRadius: 30, width: "auto" }}
            onPress={() => setStep((s) => s - 1)}
            disabled={loading}
          >
            Retour
          </Button>
        )}
        <Button
          mode="contained"
          onPress={() => (step == 0 ? handlePress() : checkSignUp())}
          loading={loading}
          style={{ borderRadius: 30, width: step == 1 ? "auto" : "100%" }}
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
