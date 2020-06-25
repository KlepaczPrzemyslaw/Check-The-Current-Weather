import {Component} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent {

  constructor(public weatherService: WeatherService,
              private router: Router) {
    if (weatherService.weatherInfo == null) {
      router.navigate(['/']);
    }
  }

  public returnToHomePage(): void {
    this.weatherService.clearInfo();
    this.router.navigate(['/']);
  }

  public convertTicksToDate = (ticks: number): string => new Date(ticks * 1000).toString();
}
