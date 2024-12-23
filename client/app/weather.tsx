import {
  StyleSheet,
  Image,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLinkTo } from "@react-navigation/native";
import { useWeatherContext } from "@/context/WeatherContext";
import React, { useMemo } from "react";
import { useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCityContext } from "@/context/CityContext";

export default function WeatherScreen() {
  const linkTo = useLinkTo();
  const navigation = useNavigation();
  const { city, weatherData, weatherLoading } = useWeatherContext();
  const {
    saveCity,
    deleteCityPending,
    deleteCity,
    saveCityPending,
    savedCities,
  } = useCityContext();

  const isCitySaved = useMemo(() => {
    if (!city) return false;

    return savedCities?.find(({ geonameId }) => geonameId === city.geonameId);
  }, [city, savedCities]);

  const renderWeatherIcon = () => {
    const clouds = weatherData?.clouds.all || 0;

    if (clouds < 20) {
      return require("../assets/images/sunny-icon.png");
    }

    return require("../assets/images/cloudy-icon.png");
  };

  const renderDate = () => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
    }).format(new Date());
    return `Today, ${formattedDate}`;
  };

  const handleSaveCity = () => {
    if (saveCityPending || deleteCityPending || !city) {
      return;
    }

    if (isCitySaved) {
      return deleteCity(isCitySaved.cityId);
    }

    return saveCity({
      cityName: city.cityName,
      country: city.country,
      longitude: city.longitude,
      latitude: city.latitude,
      geonameId: city.geonameId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.locationContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.locationBox}>
          <FontAwesome6 name="location-dot" size={20} color="white" />
          <Text style={styles.cityName}>{city?.cityName}</Text>
        </View>
        <TouchableOpacity onPress={handleSaveCity} style={styles.locationBox}>
          {isCitySaved ? (
            <MaterialIcons name="favorite" size={24} color="#F0F7FF" />
          ) : (
            <MaterialIcons name="favorite-border" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
      {weatherLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        weatherData && (
          <>
            <View style={styles.iconBox}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={renderWeatherIcon()}
              />
            </View>
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherDate}>{renderDate()}</Text>
              <Text style={styles.weatherTemperature}>
                {Math.round(weatherData?.main.temp || 0)}°
              </Text>
              <Text style={styles.weatherDescription}>
                {weatherData?.weather[0].description}
              </Text>
            </View>
            <TouchableOpacity onPress={() => linkTo("/details")}>
              <Text style={styles.viewMore}>View Mote</Text>
            </TouchableOpacity>
          </>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    marginTop: 20,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cityName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
  },
  iconBox: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 200,
    height: 150,
  },
  weatherInfo: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, .2)",
    gap: 10,
    paddingVertical: 40,
    marginTop: 50,
  },
  weatherDate: {
    fontSize: 20,
    color: "#fff",
    fontWeight: 500,
    textAlign: "center",
  },
  weatherTemperature: {
    fontSize: 80,
    color: "#fff",
    fontWeight: 600,
    textAlign: "center",
  },
  weatherDescription: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 500,
    textTransform: "capitalize",
    textAlign: "center",
  },
  viewMore: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
  },
});
