import SavedWeatherItem from "@/components/SavedWeatherItem";
import { SavedCity, useCityContext } from "@/context/CityContext";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedScreen() {
  const { savedCities, saveCityPending, fetchSavedCities } = useCityContext();

  const Item = (city: SavedCity) => <SavedWeatherItem {...city} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedCities}
        onRefresh={() => fetchSavedCities()}
        refreshing={saveCityPending}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => `${item.geonameId}`}
        ListEmptyComponent={
          <Text style={styles.emptyCity}>No saved cities</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    marginTop: 20,
  },
  contentContainerStyle: {
    gap: 20,
  },
  emptyCity: {
    color: "#fff",
  },
});
