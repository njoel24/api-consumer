import React, {useEffect, useState, Props} from "react";
import styleable from "react-styleable";
import axios, {CancelToken} from "axios";
import States from "../states-by-country/states-by-country.component.";
import Cities from "../cities-by-state/cities-by-state.component";
import WeatherPollutionByCity from "../weather-pollution-by-city/weather-pollution-by-city.component";
import Loader from "../loader/loader.component";
import css from "./container.module.css";

export interface ContainerProps { css: any}

const Container = (props: ContainerProps) => {
	const {css: {root, trbottomleft, trbottomright, trtopleft, trtopright, align, square}} = props;
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [stateSelected, setStateSelected] = useState("");
	const [citySelected, setCitySelected] = useState("");
	const [weatherPollutionByCity, setWeatherPollutionByCity] = useState(null);
	const dataRequested = true;

	useEffect(() => {
		const ajaxRequest = axios.CancelToken.source();  
		const statesByCountryUrl = "https://api.airvisual.com/v2/states?country=usa&key=9eed15cc-6979-4c6b-8383-aebbdcd7a667";
	
		axios.get(statesByCountryUrl, { cancelToken: ajaxRequest.token })
		.then((res) => {
			let {data: {data}} = res;
			data = data.map((d: any) => d.state);
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
			let {data: {data}} = res;
			data = data.map((d: any) => d.city);
			setCities(data);
			setStateSelected(state);
		}).catch((err) => console.warn(err));
	}
	
	const getWeatherPollutionByCity = (city: string): void => {
		const url = `https://api.airvisual.com/v2/city?city=${city}&state=${stateSelected}&country=usa&key=9eed15cc-6979-4c6b-8383-aebbdcd7a667`;
		axios.get(url)
		.then((res) => {
			const {data: {data}} = res;
			setWeatherPollutionByCity(data);
			setCitySelected(city);
		}).catch((err) => console.warn(err));
	}

	if (!states.length) {
		return <Loader/>
	}

	return(
		<div className={root}>
			<div>
				<div className={align}>
					<div className={trbottomleft}></div>
					<div className={trbottomright}></div>
				</div>
				<div className={square}>
					<States states={states} stateSelected={stateSelected}  getCitiesByState={getCitiesByState} />,
					<Cities cities={cities} citySelected={citySelected} getWeatherPollutionByCity={getWeatherPollutionByCity}/>
				</div>
				<div className={align}>
					<div className={trtopleft}></div>
					<div className={trtopright}></div>
				</div>
			</div>
			<div>
				<div>
					<div className={align}>
						<div className={trbottomleft}></div>
						<div className={trbottomright}></div>
					</div>
					<div className={square}>
						<WeatherPollutionByCity detail={weatherPollutionByCity} />
					</div>
					<div className={align}>
						<div className={trtopleft}></div>
						<div className={trtopright}></div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default styleable(css)(Container);