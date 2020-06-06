import React, {useEffect, useState} from "react";
import styleable from "react-styleable";
import axios, {CancelToken}  from "axios";
import States from "./states/states.component.";
import Cities from "./cities/cities.component";
import WeatherPollutionByCity from "./weather-pollution-by-city/weather-pollution-by-city.component";
import css from "./app.module.css";

export interface AppProps { css: any };

const App = (props: AppProps) => {

	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [stateSelected, setStateSelected] = useState("");
	const [weatherPollutionByCity, setWeatherPollutionByCity] = useState(null);
	const dataRequested = true;

	useEffect(() => {
		const ajaxRequest = axios.CancelToken.source();  
		const statesByCountryUrl = "https://api.airvisual.com/v2/states?country=usa&key=9eed15cc-6979-4c6b-8383-aebbdcd7a667";

		axios.get(statesByCountryUrl, { cancelToken: ajaxRequest.token })
		.then((res) => {
			const {data: {data}} = res;
			setStates(data);
		}).catch((err) => console.warn(err));

		return () => {
			ajaxRequest.cancel()
		}
	}, [dataRequested])

	const getCitiesByState = (state: string): void => {
		const url = `https://api.airvisual.com/v2/cities?state=${state}&country=usa&key=9eed15cc-6979-4c6b-8383-aebbdcd7a667`;
		axios.get(url)
		.then((res) => {
			const {data: {data}} = res;
			setCities(data);
			setStateSelected(state);
		}).catch((err) => console.warn(err));
	}

	const getWeatherPollutionByCity = (city: string): void => {
		const url = `https://api.airvisual.com/v2/city?city=${city}&state=${stateSelected}&country=USA&key=9eed15cc-6979-4c6b-8383-aebbdcd7a667`;
		axios.get(url)
		.then((res) => {
			const {data: {data}} = res;
			setWeatherPollutionByCity(data);
		}).catch((err) => console.warn(err));
	}

	return (
		<div className={props.css.root}>
			<States states={states} getCitiesByState={getCitiesByState} />,
			<Cities cities={cities} getWeatherPollutionByCity={getWeatherPollutionByCity}/>
			<WeatherPollutionByCity detail={weatherPollutionByCity} />
		</div>
	)
};

export default styleable(css)(App);