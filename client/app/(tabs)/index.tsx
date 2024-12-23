import React, { useState } from "react";
import { ICities, useCityContext } from "@/context/CityContext";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchCityItem from "@/components/SearchCityItem";

export default function SearchScreen() {
  const { fetchCitiesByName, citiesData, citiesLoading } = useCityContext();
  const [cityName, setCityName] = useState<string>("");

  const Item = (city: ICities) => <SearchCityItem {...city} />;

  const fetchCities = (name: string) => {
    fetchCitiesByName(name);
    setCityName(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.flex}>
          <Searchbar
            placeholder="Search"
            onChangeText={fetchCities}
            autoFocus
            value={cityName}
          />
          <View style={styles.listContainer}>
            {citiesLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <FlatList
                data={citiesData}
                renderItem={({ item }) => <Item {...item} />}
                keyExtractor={(item) => `${item.geonameId}`}
                style={styles.flatList}
                ListEmptyComponent={<Text>No cities found</Text>}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    marginTop: 20,
  },
  flex: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  flatList: {
    flex: 1,
  },
});
