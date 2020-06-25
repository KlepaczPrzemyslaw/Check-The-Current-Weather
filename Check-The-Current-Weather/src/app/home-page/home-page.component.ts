import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public form: FormGroup;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.form = this.getForm();
  }

  public onDetectLocation(): void {
    this.weatherService.detectLocation();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.weatherService.getWeatherInfoByCityName(
        this.form.controls.city.value
    );
  }

  public isInvalid = () =>
    this.form.controls.city.touched &&
    this.form.controls.city.dirty &&
    this.form.controls.city.invalid

  private getForm(): FormGroup {
    return new FormGroup({
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }
}
