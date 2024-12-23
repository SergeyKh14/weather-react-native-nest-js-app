import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SavedCity } from "@/context/CityContext";
import { useWeatherContext } from "@/context/WeatherContext";
import React, { FC } from "react";
import { useLinkTo } from "@react-navigation/native";

const SavedWeatherItem: FC<SavedCity> = ({ city, weather }) => {
  const linkTo = useLinkTo();
  const { fetchWeatherForCity } = useWeatherContext();

  const handleShowCity = () => {
    fetchWeatherForCity(city);
    linkTo("/weather");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleShowCity}>
      <View>
        <Text style={styles.cityName}>{city.cityName}</Text>
        <Text style={styles.weatherDescription}>
          {weather.weather[0].description}
        </Text>
      </View>
      <Text style={styles.weatherTemperature}>
        {Math.round(weather?.main.temp || 0)}°
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, .2)",
    borderRadius: 20,
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  cityName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 600,
  },
  weatherTemperature: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 600,
    textAlign: "center",
  },
  weatherDescription: {
    fontSize: 14,
    color: "#fff",
    fontWeight: 500,
    textTransform: "capitalize",
    textAlign: "center",
    marginTop: 5,
  },
});

export default SavedWeatherItem;
