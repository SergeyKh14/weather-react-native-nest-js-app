import { CitiesEntity } from "@app/shared";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.POSTGRES_URI,
  entities: [CitiesEntity],
  migrations: ["dist/apps/api/apps/api/src/db/migrations/*.js"],
};

/**
 * Typeorm Data source Options
 */
export const dataSource = new DataSource(dataSourceOptions);
