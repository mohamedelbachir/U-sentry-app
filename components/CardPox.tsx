import { StyleSheet, Text, Pressable, View } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Card } from "react-native-paper";
import { postType } from "@/utils/types";
import { useUserList } from "@/app/api/post";
import moment from "moment";

const CardPost = ({
  id,
  title,
  description,
  hash,
  imageURL,
  uuid,
  create_at,
}: postType) => {
  const users = useUserList();
  const [timeDisplay, setTimeDisplay] = useState("");
  useEffect(() => {
    const subScribe = setInterval(() => {
      setTimeDisplay(formatTimeDifference(create_at));
    }, 1000);
    return () => {
      clearInterval(subScribe);
    };
  }, []);

  return (
    <Pressable
      onPress={() => router.push("/admin/post/" + id)}
      style={{ paddingHorizontal: 10 }}
    >
      <Card style={styles.card} mode="elevated">
        <Image
          style={styles.image}
          source={imageURL}
          placeholder={hash}
          contentFit="cover"
          transition={200}
        />
        <Card.Title
          title={title}
          titleVariant="titleMedium"
          subtitleVariant="titleMedium"
          subtitleNumberOfLines={2}
          titleStyle={{
            marginTop: 10,
          }}
          subtitleStyle={{
            marginTop: 5,
            marginBottom: 2,
          }}
          subtitle={
            !users.isLoading && users.data && !users.isError ? (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: 5,
                }}
              >
                <View style={{ flexDirection: "row", alignContent: "center" }}>
                  <Text>Par&ensp;</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {users.data?.filter((d) => d.id == uuid)[0]?.username}
                  </Text>
                </View>
                <Text style={{ fontStyle: "italic" }}>{timeDisplay}</Text>
              </View>
            ) : users.isLoading ? (
              <>
                <Text>Chargement auteur ...</Text>
              </>
            ) : (
              users.isError && (
                <>
                  <Text>Pas de nom</Text>
                </>
              )
            )
          }
        />
        {description?.length! > 1 && (
          <Card.Content style={{ marginTop: 20 }}>
            <Text
              textBreakStrategy="balanced"
              ellipsizeMode="middle"
              lineBreakMode="middle"
              numberOfLines={2}
            >
              {description}
            </Text>
          </Card.Content>
        )}
      </Card>
    </Pressable>
  );
};
moment.updateLocale("fr", {
  months:
    "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
      "_"
    ),
  monthsShort:
    "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
  monthsParseExact: true,
  weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
  weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
  weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "dans %s",
    past: "il y a %s",
    s: "quelques secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number) {
    return number + (number === 1 ? "er" : "e");
  },
  meridiemParse: /PD|MD/,
  isPM: function (input) {
    return input.charAt(0) === "M";
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? "PD" : "MD";
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
});
function formatTimeDifference(timestamp) {
  return moment(timestamp).fromNow();
}
const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#0553",
  },
});
export default CardPost;
