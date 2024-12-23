import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { IWeather } from "./WeatherContext";
import { debounce } from "lodash";

export interface ICities {
  lng: number;
  geonameId: number;
  toponymName: string;
  countryId: number;
  fcl: string;
  population: number;
  countryCode: string;
  name: string;
  fclName: string;
  countryName: string;
  fcodeName: string;
  lat: number;
  fcode: string;
}
interface CityContextType {
  fetchCitiesByName: (cityName: string) => void;
  citiesData: ICities[] | undefined;
  citiesLoading: boolean;
  fetchSavedCities: () => void;
  citiesError: unknown;
  cityName: string;
  saveCity: UseMutateAsyncFunction<SavedCity, Error, SaveCityDTO>;
  deleteCity: UseMutateAsyncFunction<SavedCity, Error, number, unknown>;
  deleteCityPending: boolean;
  saveCityPending: boolean;
  savedCities: SavedCity[] | undefined;
}

export interface SaveCityDTO {
  cityName: string;
  country: string;
  longitude: number;
  latitude: number;
  geonameId: number;
}
export interface SavedCityItem {
  id: number;
  geonameId: number;
  cityName: string;
  country: string;
  longitude: number;
  latitude: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedCity {
  city: SavedCityItem;
  weather: IWeather;
  cityId: number;
  geonameId: number;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

const fetchCityData = async (cityName: string): Promise<ICities[]> => {
  if (!cityName) return [];
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/search-city?name=${cityName}`,
  );
  return response.data;
};

const getSavedCitiesWithWeather = async (): Promise<SavedCity[]> => {
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/cities`,
  );
  return response.data;
};

const saveCityFunc = async (city: SaveCityDTO): Promise<SavedCity> => {
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/cities`,
    city,
  );
  return response.data;
};

const deleteCityFunc = async (id: number): Promise<SavedCity> => {
  const response = await axios.delete(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/cities/${id}`,
  );
  return response.data;
};

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [cityName, setCityName] = useState<string>("");

  const { data: savedCities, refetch: refetchSavedCities } = useQuery<
    SavedCity[],
    Error
  >({
    queryKey: ["savedCitiesWithWeather"],
    queryFn: getSavedCitiesWithWeather,
  });

  const {
    data: citiesData,
    error: citiesError,
    isLoading: citiesLoading,
  } = useQuery<ICities[], Error>({
    queryKey: ["cities", cityName],
    queryFn: () => fetchCityData(cityName),
    enabled: !!cityName,
  });

  const { mutateAsync: saveCity, isPending: saveCityPending } = useMutation({
    mutationFn: saveCityFunc,
    onSuccess: () => {
      refetchSavedCities();
    },
  });

  const { mutateAsync: deleteCity, isPending: deleteCityPending } = useMutation(
    {
      mutationFn: deleteCityFunc,
      onSuccess: () => {
        refetchSavedCities();
      },
    },
  );

  const fetchCitiesByName = debounce((name: string) => {
    setCityName(name);
  }, 300);

  return (
    <CityContext.Provider
      value={{
        fetchCitiesByName,
        deleteCity,
        fetchSavedCities: refetchSavedCities,
        deleteCityPending,
        citiesData,
        citiesLoading,
        citiesError,
        cityName,
        saveCity,
        saveCityPending,
        savedCities,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCityContext = (): CityContextType => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCityContext must be used within a CityProvider");
  }
  return context;
};
