export interface CityDetails {
	city: string;
	country: string;
	state: string;
	location: GeoLocation;
	current: WeatherPollutionData;
}

export interface WeatherPollutionData {
	pollution: PollutionData;
	weather: WeatherData;
}

export interface PollutionData {
	aqicn: number;
	aqius: number;
	maincn: string;
	mainus: string;
}

export interface WeatherData {
	hu: number;
	ic: string;
	pr: number;
	tp: number;
	ts: string;
	wd: number;
	ws: number;
}

export interface GeoLocation {
	coordinates: number[];
	type: GeoLocationType;
}

export enum GeoLocationType { Point };
export interface WeatherPollutionByCityProps { detail: CityDetails, css: any};