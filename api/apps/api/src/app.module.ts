import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostgresDBModule, CitiesEntity, CitiesRepository } from "@app/shared";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env",
    }),
    PostgresDBModule,
    TypeOrmModule.forFeature([CitiesEntity]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "CitiesRepositoryInterface",
      useClass: CitiesRepository,
    },
  ],
})
export class AppModule {}
