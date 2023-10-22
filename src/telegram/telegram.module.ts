// telegram/telegram.module.ts
import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { WeatherModule } from '../weather/weather.module'; // Import the WeatherModule

@Module({
  controllers: [TelegramController],
  providers: [TelegramService], // Provide WeatherService
  imports: [WeatherModule], // Import WeatherModule if necessary
})
export class TelegramModule {}
