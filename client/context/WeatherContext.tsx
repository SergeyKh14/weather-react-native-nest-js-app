import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SavedCityItem } from "./CityContext";

export interface ICoord {
  lon: number;
  lat: number;
}

export interface IWeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface IWind {
  speed: number;
  deg: number;
}

export interface IClouds {
  all: number;
}

export interface ISys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeather {
  coord: ICoord;
  weather: IWeatherItem[];
  base: string;
  main: IMain;
  visibility: number;
  wind: IWind;
  clouds: IClouds;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface WeatherContextType {
  fetchWeatherForCity: (city: SavedCityItem) => void;
  weatherData: IWeather | undefined;
  weatherLoading: boolean;
  weatherError: Error | null;
  city: SavedCityItem | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const fetchWeather = async (
  latitude?: number,
  longitude?: number,
  units: string = "metric",
): Promise<IWeather> => {
  const { data } = await axios.get<IWeather>(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/weather?latitude=${latitude}&longitude=${longitude}&units=${units}`,
  );
  return data;
};

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<SavedCityItem | null>(null);

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useQuery<IWeather, Error>({
    queryKey: ["weather", city || ""],
    queryFn: () => fetchWeather(city?.latitude, city?.longitude),
    enabled: !!(city && city.latitude && city.longitude),
  });

  const fetchWeatherForCity = (city: SavedCityItem) => {
    if (city) {
      setCity(city);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        fetchWeatherForCity,
        weatherData,
        city,
        weatherLoading,
        weatherError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};
