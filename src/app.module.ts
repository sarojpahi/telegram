import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { UsermanagementModule } from './usermanagement/usermanagement.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [TelegramModule, UsermanagementModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
