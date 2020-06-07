import React, {useEffect, useState, Props} from "react";
import styleable from "react-styleable";
import axios, {CancelToken} from "axios";
import States from "../states-by-country/states-by-country.component.";
import Cities from "../cities-by-state/cities-by-state.component";
import FetchError from "../fetch-error/fetch-error.component";
import WeatherPollutionByCity from "../weather-pollution-by-city/weather-pollution-by-city.component";
import Loader from "../loader/loader.component";
import css from "./container.module.css";
import config from "../../config/prod.config.json";

export interface ContainerProps { css: Record<string, any>}

const Container = (props: ContainerProps) => {
	const {css: {root, trbottomleft, trbottomright, trtopleft, trtopright, align, square}} = props;
	const {apiBaseUrl, defaultCountry, apiKey} = config;
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [stateSelected, setStateSelected] = useState("");
	const [citySelected, setCitySelected] = useState("");
	const [isDataUpdating, setIsDataUpdating] = useState(false);
	const [weatherPollutionByCity, setWeatherPollutionByCity] = useState(null);
	const [fetchError, setFetchError] = useState(null);
	const dataRequested = true;

	useEffect(() => {
		const ajaxRequest = axios.CancelToken.source();
		const statesByCountryUrl = `${apiBaseUrl}states?country=${defaultCountry}&key=${apiKey}`;
		setIsDataUpdating(true);
		setFetchError(null);
		axios.get(statesByCountryUrl, { cancelToken: ajaxRequest.token })
		.then((res) => {
			let {data: {data}} = res;
			data = data.map((d: Record<"state", string>) => d.state);
			setStates(data);
		})
		.catch((err) => setFetchError(err))
		.finally(() => setIsDataUpdating(false));

		return () => {
			ajaxRequest.cancel()
		}
	}, [dataRequested])

	const getCitiesByState = (state: string): void => {
		const url = `${apiBaseUrl}cities?state=${state}&country=${defaultCountry}&key=${apiKey}`;
		setIsDataUpdating(true);
		setFetchError(null);
		axios.get(url)
		.then((res) => {
			let {data: {data}} = res;
			data = data.map((d: Record<"city", string>) => d.city);
			setCities(data);
			setStateSelected(state);
		})
		.catch((err) => setFetchError(err))
		.finally(() => setIsDataUpdating(false));
	}

	const getWeatherPollutionByCity = (city: string): void => {
		const url = `${apiBaseUrl}city?city=${city}&state=${stateSelected}&country=${defaultCountry}&key=${apiKey}`;
		setIsDataUpdating(true);
		setFetchError(null);
		axios.get(url)
		.then((res) => {
			const {data: {data}} = res;
			setWeatherPollutionByCity(data);
			setCitySelected(city);
			setIsDataUpdating(false);
		})
		.catch((err) => setFetchError(err))
		.finally(() => setIsDataUpdating(false));
	}

	const getLoader = () => isDataUpdating ? <Loader/> : null;
	const getFetchError = () => fetchError ? <FetchError/> : null;

	return(
		<div>
			{getLoader()}
			{getFetchError()}
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
		</div>
	)
};

export default styleable(css)(Container);