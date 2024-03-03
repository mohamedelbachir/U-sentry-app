import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Appbar, Card } from "react-native-paper";
import { usePostListById } from "@/app/api/post";
import { Image } from "expo-image";
import ScreenWrapper from "@/utils/screenWrapper";
import { postType } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DialogComponent from "@/components/Dialog";
const Post = () => {
  const { id } = useLocalSearchParams();
  const postRef = usePostListById(parseInt(id));
  const [loading, setLoading] = useState(false);
  const [isInside, setIsInside] = useState(false); // Initial state should be false
  const [title, setTitle] = useState("Ajout dans votre favoris"); // Initial title

  useEffect(() => {
    if (isInside) {
      setTitle("Suppression du favoris");
    } else {
      setTitle("Ajout dans votre favoris");
    }
  }, [isInside]);

  const handleClick = async (d) => {
    setLoading(true);
    try {
      if (isInside) {
        await AsyncStorage.removeItem(`${d.id}`);
        setIsInside(false);
      } else {
        await AsyncStorage.setItem(`${d.id}`, JSON.stringify(d));
        setIsInside(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem(`${id}`)
      .then((result) => {
        if (result) {
          setIsInside(true);
        } else {
          setIsInside(false);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  if (postRef.isLoading) {
    return (
      <View
        style={[
          styles.container,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Stack.Screen
          options={{
            title: "post",
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (postRef.isError) {
    return (
      <View
        style={[
          styles.container,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Stack.Screen
          options={{
            title: "post",
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Text>Echec de chargement de l'article</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={postRef.data!.title} />
        <Appbar.Action
          icon={isInside ? "bookmark-remove" : "bookmark-plus-outline"}
          onPress={() => handleClick(postRef.data)}
          loading={loading}
        />
      </Appbar.Header>
      <Stack.Screen
        options={{
          title: "post",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />

      <View style={[styles.container, { paddingHorizontal: 10 }]}>
        <Image style={styles.image} source={postRef.data!.imageURL} />
        <Text style={{ fontSize: 20 }}>{postRef.data!.title}</Text>
        <Text>{postRef.data!.description}</Text>
      </View>
      <DialogComponent visible={loading} titre={title} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "auto",
    backgroundColor: "#0553",
  },
});
export default Post;
