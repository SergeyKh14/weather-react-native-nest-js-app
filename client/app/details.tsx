import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useWeatherContext } from "@/context/WeatherContext";

export default function HomeScreen() {
  const { city, weatherData } = useWeatherContext();

  return (
    <SafeAreaView>
      <View style={styles.locationContainer}>
        <View style={styles.locationBox}>
          <FontAwesome6 name="location-dot" size={20} color="white" />
          <Text style={styles.cityName}>{city?.cityName}</Text>
        </View>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.detailItem}>
          Feels Like: {Math.round(weatherData?.main.feels_like || 0)}°
        </Text>
        <Text style={styles.detailItem}>
          humidity: {weatherData?.main.humidity}%
        </Text>
        <Text style={styles.detailItem}>
          Wind Speed: {weatherData?.wind.speed} km/h
        </Text>
        <Text style={styles.detailItem}>
          Pressure: {weatherData?.main.pressure} hpa
        </Text>
      </View>
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
  cityName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailBox: {
    paddingHorizontal: 28,
    marginTop: 20,
    gap: 10,
  },
  detailItem: {
    color: "#fff",
    fontSize: 20,
  },
});
