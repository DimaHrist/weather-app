import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  currentCity: string;
  weatherStatus: string;
  weather: any;
  windSpeed: number;
  windDeg: number;
  windDirection: string;
  pressure: number;
  humidity: number;
  clouds: number;
  tempC: number;
  tempF: number;

  constructor( private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeatherByCity('Moscow')
    .subscribe(data => {
      this.weather = data;
      this.windSpeed = this.weather.wind.speed;
      this.windDeg = this.weather.wind.deg;
      this.pressure = Math.round(this.weather.main.pressure * 0.75);
      this.humidity = this.weather.main.humidity;
      this.clouds = this.weather.clouds.all;
      this.tempC = Math.round(this.weather.main.temp - 273.15);
      this.tempF = Math.round((this.weather.main.temp * (9 / 5)) - 459.67);
      this.weatherStatus = this.weather.weather[0].main;
      console.log(this.weatherStatus);
      if (this.windDeg === 0 || this.windDeg === 360 )  {
        this.windDirection = 'Северный';
      } else if (this.windDeg > 0 && this.windDeg < 90) {
        this.windDirection = 'Северо-Восточный';
      } else if (this.windDeg === 90) {
        this.windDirection = 'Восточный';
      } else if (this.windDeg > 90 && this.windDeg < 180) {
        this.windDirection = 'Юго-Восточный';
      } else if (this.windDeg === 180) {
        this.windDirection = 'Южный';
      } else if (this.windDeg > 180 && this.windDeg < 270) {
        this.windDirection = 'Юго-Западный';
      } else if (this.windDeg === 270) {
        this.windDirection = 'Западный';
      } else if (this.windDeg > 270 && this.windDeg < 360) {
        this.windDirection = 'Северо-Западный';
      } else {
        return;
      }
      console.log(this.windDirection);
      
    });
  }
  


}
