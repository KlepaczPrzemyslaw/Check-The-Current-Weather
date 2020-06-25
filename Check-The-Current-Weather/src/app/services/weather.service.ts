import {Injectable} from '@angular/core';
import {WeatherHttpService} from './weather.http.service';
import {WeatherInfoModel} from '../models/weather-info.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

const KelvinBase = 273.15;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public weatherInfo: WeatherInfoModel = null;

  constructor(private router: Router,
              private weatherHttpService: WeatherHttpService) {
  }

  public detectLocation(): void {
    navigator.geolocation.getCurrentPosition(position => {
        this.getWeatherInfoByCoords(position.coords.latitude,
          position.coords.longitude);
      }, () => console.error('NOTIFICATION HERE')
    );
  }

  public getWeatherInfoByCityName(cityName: string): void {
    this.processObservable(
      this.weatherHttpService.getWeatherByCityName(cityName)
    );
  }

  public clearInfo(): void {
    this.weatherInfo = null;
  }

  public getTemperatureInCelsius(): string {
    if (this.weatherInfo) {
      return (this.weatherInfo.temperature - KelvinBase).toFixed(2);
    }

    return null;
  }

  private getWeatherInfoByCoords(latitude: number, longitude: number): void {
    this.processObservable(
      this.weatherHttpService.getWeatherByCoords(latitude, longitude)
    );
  }

  private processObservable(observable: Observable<any>): void {
    observable.pipe(
      map(({
             name, dt, weather,
             sys: {country, sunrise, sunset},
             main: {temp, pressure, humidity},
             wind: {speed},
             coord: {lat, lon}
           }) => new WeatherInfoModel(name, country, temp, weather[0].description,
        dt, speed, pressure, humidity, sunrise, sunset, lat, lon))
    ).subscribe(
      response => {
        this.weatherInfo = response;
        this.router.navigate(['/result']);
      }, () => console.error('NOTIFICATION HERE')
    );
  }
}
