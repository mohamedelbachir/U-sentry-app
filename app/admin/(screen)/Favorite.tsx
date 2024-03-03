import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { ActivityIndicator, Appbar } from "react-native-paper";
import ScreenWrapper from "@/utils/screenWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postType } from "@/utils/types";
import CardPost from "@/components/CardPox";

export default function Favorite() {
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [isError, setError] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>();
  useEffect(() => {
    (async () => {
      await AsyncStorage.getAllKeys()
        .then((datas) => {
          setKeys(datas as string[]);
          setError(false);
        })
        .catch((e) => {
          setError(true);
          console.log(e);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    })();
  }, []);
  useEffect(() => {
    const getData = async () => {
      let datas = keys.map(async (k) => {
        return await AsyncStorage.getItem(k);
      });
      await Promise.allSettled(datas)
        .then((d) => {
          const v = d.map((c) => JSON.parse(c.value));
          setValues(v);
          setError(false);
        })
        .catch((e) => {
          console.log(e);
          setError(true);
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingData(false);
          }, 1000);
        });
    };
    if (keys) {
      getData();
    }
  }, [keys]);

  return (
    <>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Vos favoris" />
      </Appbar.Header>
      <Stack.Screen
        options={{
          title: "favorite",
          headerShown: false,
          animation: "fade",
        }}
      />
      {(loading || loadingData) && (
        <View style={styles.container}>
          <ActivityIndicator
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
            size={"large"}
          />
        </View>
      )}
      {isError && (
        <View style={styles.container}>
          <Text>Erreur de chargement des favoris ..</Text>
        </View>
      )}

      {values?.length! > 0 && !loadingData && (
        <ScreenWrapper>
          {values!.map((d, i) => (
            <CardPost {...(d as unknown as postType)} key={i} />
          ))}
        </ScreenWrapper>
      )}
      {values?.length === 0 && !loadingData && !loading && (
        <View style={styles.container}>
          <Text>Vous n'avez rien dans vos favoris</Text>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
