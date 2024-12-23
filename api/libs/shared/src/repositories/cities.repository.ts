import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CitiesEntity } from "../entities/cities";
import { BaseAbstractRepository } from "./base/base.abstract.respository";

@Injectable()
export class CitiesRepository extends BaseAbstractRepository<CitiesEntity> {
  constructor(
    @InjectRepository(CitiesEntity)
    private readonly citiesRepository: Repository<CitiesEntity>
  ) {
    super(citiesRepository);
  }

  public async findById(id: number): Promise<CitiesEntity | undefined> {
    return await this.citiesRepository.findOne({ where: { id } });
  }

  public async saveCity(
    cityData: Partial<CitiesEntity>
  ): Promise<CitiesEntity> {
    return await this.citiesRepository.save(cityData);
  }
}
