import { View, Text, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/supabase/initSupabase";
import { useClassInformationList } from "@/app/api/info";
import { ActivityIndicator } from "react-native-paper";

const Account = () => {
  const { session, classeId } = useAuth();
  const [loading, setLoading] = useState(false);
  const classInfo = useClassInformationList(session?.user.id!);
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
      {classInfo.isLoading && <ActivityIndicator size={"large"} />}
      {classInfo.data && (
        <>
          <Logo />
          <Header>Vous nous quitter deja?</Header>
          <Text style={[styles.text, { color: "darkgray" }]}>
            {session?.user.email}
          </Text>
          <View style={styles.wrapper}>
            <Text style={[styles.label, styles.text]}>Faculte : </Text>
            <Text style={styles.text}>{classInfo.data?.fac}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={[styles.label, styles.text]}>Departement : </Text>
            <Text style={styles.text}>{classInfo.data?.dep}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={[styles.label, styles.text]}>Filiere : </Text>
            <Text style={styles.text}>{classInfo.data?.fil}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={[styles.label, styles.text]}>Niveau : </Text>
            <Text style={styles.text}>{classInfo.data?.niv}</Text>
          </View>
          <Button
            mode="outlined"
            style={{ borderRadius: 30 }}
            onPress={handleSignOut}
            loading={loading}
          >
            Se deconnecter
          </Button>
        </>
      )}
      {classInfo.isError && (
        <>
          <Text>Impossible de charger votre information</Text>
        </>
      )}
    </Background>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    fontSize: 20,
  },
  label: {
    fontWeight: "bold",
  },
});
export default Account;
