import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/search-city")
  async getCountries(@Query("name") cityName: string) {
    if (!cityName) {
      throw new HttpException("City name is required", HttpStatus.BAD_REQUEST);
    }

    return this.appService.getCountriesByName(cityName);
  }

  @Get("/weather")
  async getWeather(
    @Query("latitude") latitude: string,
    @Query("longitude") longitude: string,
    @Query("units") units: string
  ) {
    return this.appService.getWeather(latitude, longitude, units);
  }

  @Get("/cities")
  async getCities() {
    return this.appService.getCitiesWithWeather();
  }

  @Post("/cities")
  async saveCity(
    @Body("cityName") cityName: string,
    @Body("country") country: string,
    @Body("longitude") longitude: number,
    @Body("latitude") latitude: number,
    @Body("geonameId") geonameId: number
  ) {
    if (!cityName || !country || !longitude || !latitude || !geonameId) {
      throw new HttpException(
        "cityName, country, longitude, and latitude are required fields",
        HttpStatus.BAD_REQUEST
      );
    }

    return this.appService.saveCity({
      cityName,
      country,
      longitude,
      latitude,
      geonameId,
    });
  }

  @Delete("/cities/:id")
  async deleteCity(@Param("id") id: number) {
    return this.appService.deleteCity(id);
  }
}
