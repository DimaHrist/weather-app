import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  key = 'APPID=bd2f4622a58020871ca771d6faba1957';

  constructor(private http: HttpClient) { }

  getWeatherByCity(city): Observable<any> {
    return this
      .http
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&${this.key}`
      );
  }

  getCityByLocation(lat, lng): Observable<any> {
    return this
      .http
      .get(
        `http://api.openweathermap.org/data/2.5/weather/?${this.key}&lat=${lat}&lon=${lng}`
      );
  }
}
