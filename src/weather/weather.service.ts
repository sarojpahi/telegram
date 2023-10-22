import { Injectable } from '@nestjs/common';
import axios from 'axios';

const key = '7fe947eb97df84f60ad9fc00bd33e1de';

@Injectable()
export class WeatherService {
  async getWeatherByCity(city: string) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    const response = await axios.get(apiUrl);
    return response.data;
  }
  async getWeatherByLocation(lat: number, lon: number) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    const response = await axios.get(apiUrl);
    return response.data;
  }
  // Method to save user location
  saveUserLocation(chatId: number, location: string) {
    // Implement code to save the user's location, e.g., in a database
    console.log(chatId, location);
  }

  // Method to subscribe to daily weather updates
  subscribeToDailyWeather(chatId: number) {
    console.log(chatId);

    // Implement code to set up daily weather updates for the user
  }

  // Method to send weather updates
  sendWeatherUpdate(chatId: number, weatherData: string) {
    console.log(chatId, weatherData);

    // Implement code to send weather updates to the user
  }
}
