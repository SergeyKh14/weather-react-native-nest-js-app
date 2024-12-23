import { CitiesEntity } from "../entities/cities";
import { IWeatherResponse } from "./weather.interface";

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

export class ICitiesWithWeather {
  city: Pick<
    CitiesEntity,
    "id" | "geonameId" | "cityName" | "country" | "longitude" | "latitude"
  >;
  weather: IWeatherResponse;
  cityId: number;
  geonameId: number;
}
