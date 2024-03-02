import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
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
import {
  useDepartementList,
  useFacultyList,
  useFiliereList,
  useNiveauList,
} from "./api/info";
import { CreateUser } from "./api/account";
import { useAuth } from "@/provider/AuthProvider";

type optionProps = {
  label: string;
  value: string;
};

const login = () => {
  const { setSession } = useAuth();
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

  const { data: facList = [], isLoading: facLoading } = useFacultyList();
  const { data: depList = [], isLoading: depLoading } = useDepartementList();
  const { data: filiereList = [], isLoading: filiereLoading } =
    useFiliereList();
  const { data: niveauList = [], isLoading: niveauLoading } = useNiveauList();
  const createUser = CreateUser({
    classe: {
      departement_id: parseInt(departement),
      faculte_id: parseInt(faculty),
      filiere_id: parseInt(filiere),
      niveau_id: parseInt(niveau),
    },
    email: email.value,
    password: password.value,
  });

  const [deps, setDeps] = useState<
    {
      faculte_id: number;
      id: number;
      nom: string;
    }[]
  >([]);
  const [filieres, setFilieres] = useState<
    {
      departement_id: number | null;
      id: number;
      nom: string;
    }[]
  >([]);
  const [niveaux, setNiveaux] = useState<
    {
      id: number;
      nom: string;
    }[]
  >([]);

  useEffect(() => {
    if (facList.length > 0) {
      const newListFaculty = facList.map((item) => ({
        label: item.nom,
        value: `${item.id}`,
      }));
      setListFaculty(newListFaculty);
    }
  }, [facList]);

  useEffect(() => {
    if (depList.length > 0 && faculty !== "") {
      const l = depList.filter((d) => d.faculte_id === parseInt(faculty));
      setDeps(l);
    }
  }, [faculty, depList]);

  useEffect(() => {
    if (filiereList.length > 0 && faculty !== "") {
      const l = filiereList.filter((d) => d.faculte_id === parseInt(faculty));
      setFilieres(l);
    }
  }, [faculty, filiereList]);

  useEffect(() => {
    if (niveauList.length > 0 && faculty !== "") {
      const l = niveauList.filter((d) => d.faculte_id === parseInt(faculty));
      setNiveaux(l);
    }
  }, [faculty, niveauList]);

  const [listFaculty, setListFaculty] = useState<optionProps[]>([]);
  const [listDepartement, setListDepartement] = useState<optionProps[]>([]);
  const [listFiliere, setListFiliere] = useState<optionProps[]>([]);
  const [listNiveau, setListNiveau] = useState<optionProps[]>([]);

  useEffect(() => {
    if (facList.length > 0) {
      const newListFaculty = facList.map((item) => ({
        label: item.nom,
        value: `${item.id}`,
      }));
      setListFaculty(newListFaculty);
    }
  }, [facList]);

  useEffect(() => {
    if (deps.length > 0) {
      const newListDepartement = deps.map((item) => ({
        label: item.nom,
        value: `${item.id}`,
      }));
      setListDepartement(newListDepartement);
    }
  }, [deps]);

  useEffect(() => {
    if (filieres.length > 0) {
      const newListFiliere = filieres.map((item) => ({
        label: item.nom,
        value: `${item.id}`,
      }));
      setListFiliere(newListFiliere);
    }
  }, [filieres]);

  useEffect(() => {
    if (niveaux.length > 0) {
      const newListNiveau = niveaux.map((item) => ({
        label: item.nom,
        value: `${item.id}`,
      }));
      setListNiveau(newListNiveau);
    }
  }, [niveaux]);

  useEffect(() => {
    if (createUser.isSuccess) {
      setSession!(createUser.data.session);
      router.navigate("/admin");
    }
    if (createUser.isError) {
      setStep(0);
      Alert.alert("Erreur inconnue");
    }
  }, [createUser.isSuccess, createUser.isError]);

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
    createUser.mutate();
  };
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
              list={listFaculty}
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
              list={listDepartement}
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
              list={listFiliere}
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
              list={listNiveau}
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
          loading={createUser.isLoading}
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
