export interface WeatherResponse {
  city: City;
  list: WeatherItem[];
}

export interface City {
  id: number;
  name: string;
  country: string;
}

export interface WeatherItem {
  dt: number;
  dt_txt: string;
  main: MainWeather;
  weather: WeatherDescription[];
  wind: Wind;
}

export interface MainWeather {
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  pressure: number;
  humidity: number;
}

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface SidebarWeather {
  city: string;
  country: string;
  temperature_max: number;
  temperature_min: number;
  feelsLike: number;
  clouds: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  date: string;
  time: Date;
  iconUrl: string;
}
