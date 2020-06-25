import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const apiUrl = environment.apiUrl;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherHttpService {

  constructor(private httpService: HttpClient) {
  }

  public getWeatherByCoords(latitude: number, longitude: number): Observable<any> {
    return this.httpService.get(`${apiUrl}/data/2.5/weather?lat=${
        latitude.toFixed(2).toString()
      }&lon=${
        longitude.toFixed(2).toString()
      }&appid=${
        apiKey
      }`);
  }

  public getWeatherByCityName(name: string): Observable<any> {
    return this.httpService.get(`${apiUrl}/data/2.5/weather?q=${
        name
      }&appid=${
        apiKey
      }`);
  }
}
