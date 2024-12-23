import { CitiesEntity } from "../entities/cities";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";

export interface CitiesRepositoryInterface
  extends BaseInterfaceRepository<CitiesEntity> {
  /**
   * Find Saved City
   * @param { number } id - id
   */
  findById(id: number): Promise<CitiesEntity | undefined>;
  /**
   * Save City
   * @param { Partial<CitiesEntity> } cityData - saved city data
   */
  findById(cityData: Partial<CitiesEntity>): Promise<CitiesEntity>;
}
