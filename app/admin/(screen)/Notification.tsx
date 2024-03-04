import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserClassInfo, useUserNotification } from "@/app/api/post";
import { ActivityIndicator } from "react-native-paper";
import { postType } from "@/utils/types";
import CardPost from "@/components/CardPox";
import { supabase } from "@/supabase/initSupabase";
import { useQueryClient } from "react-query";
//{"depId": [21], "facId": [46], "filiereId": [18], "niveauId": [18]}
type dataTarget = {
  depId?: number[];
  facId?: number[];
  filiereId?: number[];
  niveauId?: number[];
};
const Notification = () => {
  const notifications = useUserNotification();
  const classInfo = useUserClassInfo();
  const [datas, setDatas] = useState<postType[]>([]);
  const clientQuery = useQueryClient();
  useEffect(() => {
    if (notifications.isSuccess && classInfo.isSuccess) {
      let nofs = notifications.data.filter((f) => {
        const t = f.target as dataTarget;
        const info = classInfo.data;
        return (
          t.depId?.includes(info.departement_id) ||
          t.facId?.includes(info.faculte_id) ||
          t.filiereId?.includes(info.filiere_id) ||
          t.niveauId?.includes(info.niveau_id)
        );
      });
      setDatas(nofs);
    }
  }, [notifications.isSuccess, classInfo.isSuccess]);
  useEffect(() => {
    const alertes = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "alertes" },
        (payload) => {
          clientQuery.invalidateQueries(["notification-list"]);
        }
      )
      .subscribe();
    return () => {
      alertes.unsubscribe();
    };
  }, []);
  return (
    <>
      {(classInfo.isLoading || notifications.isLoading) && (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {notifications.data &&
        !classInfo.isLoading &&
        (datas.length == 0 ? (
          <View style={styles.container}>
            <Text>Vous n'avez pas encore de notification</Text>
          </View>
        ) : (
          datas.map((d, i) => <CardPost {...d} key={i} />)
        ))}
      {(notifications.isError || classInfo.isError) && (
        <View style={styles.container}>
          <Text>Erreur de chargement de notifications</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notification;
