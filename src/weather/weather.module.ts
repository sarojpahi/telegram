// weather/weather.module.ts
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService], // Include WeatherService in the providers
  exports: [WeatherService], // Export WeatherService if needed in other modules
})
export class WeatherModule {}
