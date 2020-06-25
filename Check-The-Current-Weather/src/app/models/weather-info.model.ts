export class WeatherInfoModel {
  constructor(
    public cityName: string,
    public cityShortcut: string,
    public temperature: number,
    public cloudiness: string,
    public date: Date,
    public windSpeed: string,
    public pressure: string,
    public humidity: string,
    public sunrise: Date,
    public sunset: Date,
    public latitude: number,
    public longitude: number
  ) {
  }
}
