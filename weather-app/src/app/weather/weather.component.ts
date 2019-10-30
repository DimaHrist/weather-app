import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { FormControl } from '@angular/forms';

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
  temp: number;
  currLat: number;
  currLng: number;
  inputEnabled = false;
  search = new FormControl();

  constructor( private weatherService: WeatherService) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log(this.currLat, this.currLng);
        this.weatherService.getCityByLocation(this.currLat, this.currLng)
        .subscribe(data =>  {
          this.currentCity = data.name;
          this.getWeather(this.currentCity);
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  getWeather(city) {
    this.weatherService.getWeatherByCity(city)
    .subscribe(data => {
      this.weather = data;
      this.windSpeed = this.weather.wind.speed;
      this.windDeg = this.weather.wind.deg;
      this.pressure = Math.round(this.weather.main.pressure * 0.75);
      this.humidity = this.weather.main.humidity;
      this.clouds = this.weather.clouds.all;
      this.temp = Math.round(this.weather.main.temp - 273.15);
      this.weatherStatus = this.weather.weather[0].main;
      this.currentCity = data.name;
      console.log(this.weather);
      if (this.windDeg === 0 || this.windDeg === 360 )  {
        this.windDirection = ', Северный';
      } else if (this.windDeg > 0 && this.windDeg < 90) {
        this.windDirection = ', Северо-Восточный';
      } else if (this.windDeg === 90) {
        this.windDirection = ', Восточный';
      } else if (this.windDeg > 90 && this.windDeg < 180) {
        this.windDirection = ', Юго-Восточный';
      } else if (this.windDeg === 180) {
        this.windDirection = ', СевероЮжный';
      } else if (this.windDeg > 180 && this.windDeg < 270) {
        this.windDirection = ', Юго-Западный';
      } else if (this.windDeg === 270) {
        this.windDirection = ', Западный';
      } else if (this.windDeg > 270 && this.windDeg < 360) {
        this.windDirection = ', Северо-Западный';
      } else {
        return;
      }
      console.log(this.windDirection);
    });
  }

  changeTemp(temp) {
    if (temp === 'C') {
      this.temp = Math.round(this.weather.main.temp - 273.15);
    } else {
      this.temp = Math.round((this.weather.main.temp * (9 / 5)) - 459.67);
    }
  }

  changeCity() {
    this.inputEnabled = true;
  }

  submit() {
    this.inputEnabled = false;
    this.getWeather(this.search.value);
  }
}
