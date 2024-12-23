import { ICities } from "@/context/CityContext";
import { useWeatherContext } from "@/context/WeatherContext";
import { useLinkTo } from "@react-navigation/native";
import React, { FC } from "react";
import { List } from "react-native-paper";

const SearchCityItem: FC<ICities> = (city) => {
  const linkTo = useLinkTo();
  const { fetchWeatherForCity } = useWeatherContext();

  const selectCity = (city: ICities) => {
    const selectedCity = {
      id: city.geonameId,
      geonameId: city.geonameId,
      cityName: city.name,
      country: city.countryName,
      longitude: city.lng,
      latitude: city.lat,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    fetchWeatherForCity(selectedCity);
    linkTo("/weather");
  };

  return (
    <List.Item
      title={`${city.name}, ${city.countryName}`}
      onPress={() => selectCity(city)}
    />
  );
};

export default SearchCityItem;
