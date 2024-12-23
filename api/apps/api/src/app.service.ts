import {
  ICities,
  ICitiesWithWeather,
  IWeatherResponse,
  CitiesEntity,
  CitiesRepositoryInterface,
} from "@app/shared";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import { CityDTO } from "./dtos/SaveCity.dto";

@Injectable()
export class AppService {
  constructor(
    @Inject("CitiesRepositoryInterface")
    private readonly citiesRepository: CitiesRepositoryInterface
  ) {}

  async getCountriesByName(cityName: string): Promise<ICities[]> {
    try {
      const response = await axios.get(
        `${process.env.GEO_NAMES_URL}/searchJSON?name_startsWith=${cityName}&maxRows=20&username=${process.env.GEO_NAMES_USERNAME}`
      );

      if (!response.data || !response.data.geonames) {
        throw new HttpException(
          "An error occurred while fetching city data",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return response.data.geonames;
    } catch (err) {
      throw new HttpException(
        "An error occurred while fetching city data",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getWeather(
    latitude: string,
    longitude: string,
    units: string
  ): Promise<IWeatherResponse> {
    try {
      const response = await axios.get(
        `${process.env.OPEN_WEATHER_MAP_URL}/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${process.env.OPEN_WEATHER_MAP_APP_ID}`
      );

      if (!response.data) {
        throw new HttpException(
          "Weather data is unavailable or the response is malformed.",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return response.data;
    } catch (err) {
      if (err.response) {
        throw new HttpException(
          err.response.data.message ||
            "Error fetching weather data from the API.",
          HttpStatus.BAD_REQUEST
        );
      }

      if (err.request) {
        throw new HttpException(
          "Unable to connect to the weather service. Please check your internet connection.",
          HttpStatus.GATEWAY_TIMEOUT
        );
      }

      throw new HttpException(
        "An unexpected error occurred while processing the request.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getCities(): Promise<CitiesEntity[]> {
    try {
      const allCities = await this.citiesRepository.findAll();
      return allCities;
    } catch (error) {
      console.error("Error fetching saved cities:", error.message);
      throw new HttpException(
        "An error occurred while fetching saved cities",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getCitiesWithWeather(): Promise<ICitiesWithWeather[]> {
    try {
      const allCities = await this.citiesRepository.findAll();
      const citiesWithWeather: ICitiesWithWeather[] = [];

      for (const city of allCities) {
        const weather = await this.getWeather(
          city.latitude.toString(),
          city.longitude.toString(),
          "metric"
        );

        citiesWithWeather.push({
          cityId: city.id,
          geonameId: city.geonameId,
          city,
          weather,
        });
      }

      return citiesWithWeather;
    } catch (error) {
      console.error("Error fetching saved cities with weather:", error.message);
      throw new HttpException(
        "An error occurred while fetching saved cities with weather",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async saveCity(body: CityDTO): Promise<CitiesEntity> {
    try {
      if (
        !body.cityName ||
        !body.country ||
        !body.longitude ||
        !body.latitude ||
        !body.geonameId
      ) {
        throw new HttpException(
          "cityName, country, longitude, geonameId, and latitude are required fields",
          HttpStatus.BAD_REQUEST
        );
      }

      const alreadySaved = await this.citiesRepository.findByCondition({
        where: {
          geonameId: body.geonameId,
        },
      });

      if (alreadySaved) {
        return alreadySaved;
      }

      const savedCity = this.citiesRepository.create(body);
      await this.citiesRepository.save(savedCity);
      return savedCity;
    } catch (error) {
      console.error("Error saving city:", error.message);
      throw new HttpException(
        "An error occurred while saving the city",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteCity(id: number): Promise<string> {
    try {
      if (!id) {
        throw new HttpException("City ID is required", HttpStatus.BAD_REQUEST);
      }

      const city = await this.citiesRepository.findOneById(id);

      if (!city) {
        throw new HttpException("City not found", HttpStatus.NOT_FOUND);
      }

      await this.citiesRepository.remove(city);

      return "City successfully deleted";
    } catch (error) {
      console.error("Error deleting city:", error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        "An error occurred while deleting the city",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
