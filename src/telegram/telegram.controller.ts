import { Controller } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { WeatherService } from '../weather/weather.service';
import { Observable } from 'rxjs';

@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly weatherService: WeatherService,
  ) {
    const messageReceivedObservable: Observable<any> =
      this.telegramService.getMessageReceivedObservable();

    messageReceivedObservable.subscribe((message) => {
      // Handle the received message here
      console.log('Received message:', message);
      this.handleMessage(message);
    });
  }

  handleMessage(msg) {
    const hi = 'hi';
    if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
      this.telegramService.sendMessage(msg.chatId, 'Hello dear user');
    }

    const bye = 'bye';
    if (msg.text.toString().toLowerCase().includes(bye)) {
      this.telegramService.sendMessage(
        msg.chatId,
        'Hope to see you around again, Bye',
      );
    }

    // Check if the user wants to subscribe to daily weather updates
    const subscribeCommand = '/subscribe';
    if (msg.text.toString().toLowerCase() === subscribeCommand) {
      this.startWeatherSubscription(msg);
    }
  }

  startWeatherSubscription(msg) {
    const chatId = msg.chatId;
    // Send a message explaining the subscription process
    this.telegramService.sendMessage(
      chatId,
      'To subscribe to daily weather updates, please provide your location.',
    );

    // Request location from the user
    this.telegramService.requestLocation(
      chatId,
      'Please share your location with us to receive weather updates.',
    );

    // Handle user's response to location request
    this.telegramService.onLocationReceived(chatId, (location) => {
      // Store the location and subscribe the user to weather updates
      this.weatherService.saveUserLocation(chatId, location);
      this.weatherService.subscribeToDailyWeather(chatId);

      // Send a confirmation message
      this.telegramService.sendMessage(
        chatId,
        'You are now subscribed to daily weather updates for your location.',
      );
    });
  }
}
