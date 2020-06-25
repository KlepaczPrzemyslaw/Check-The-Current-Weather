export class WeatherInfoModel {
  constructor(
    public cityName: string,
    public cityShortcut: string,
    public temperature: number,
    public cloudiness: string,
    public date: number,
    public windSpeed: string,
    public pressure: string,
    public humidity: string,
    public sunrise: number,
    public sunset: number,
    public latitude: number,
    public longitude: number
  ) {
  }
}
