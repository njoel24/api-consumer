import React, {useEffect, useState} from "react";
/* tslint:disable no-submodule-imports */
import withStyles from "isomorphic-style-loader/withStyles";
import axios from "axios";
import States from "../states-by-country/states-by-country.component";
import Cities from "../cities-by-state/cities-by-state.component";
import FetchError from "../fetch-error/fetch-error.component";
import WeatherPollutionByCity from "../weather-pollution-by-city/weather-pollution-by-city.component";
import Loader from "../loader/loader.component";
import css from "./container.module.css";
import config from "../../config/prod.config.json";

const getLoader = (isDataUpdating: boolean) => isDataUpdating ? <Loader/> : null;
const getFetchError = (fetchError: any) => fetchError ? <FetchError/> : null;

const Container = React.memo(() => {
	const {root, trbottomleft, trbottomright, trtopleft, trtopright, align, square} = css;
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

		setIsDataUpdating(true);
		setFetchError(null);

		const ajaxRequest = axios.CancelToken.source();
		axios.get(`${apiBaseUrl}states?country=${defaultCountry}&key=${apiKey}`, { cancelToken: ajaxRequest.token })
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

		setIsDataUpdating(true);
		setFetchError(null);

		axios.get(`${apiBaseUrl}cities?state=${state}&country=${defaultCountry}&key=${apiKey}`)
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

		setIsDataUpdating(true);
		setFetchError(null);

		axios.get(`${apiBaseUrl}city?city=${city}&state=${stateSelected}&country=${defaultCountry}&key=${apiKey}`)
		.then((res) => {
			const {data: {data}} = res;
			setWeatherPollutionByCity(data);
			setCitySelected(city);
			setIsDataUpdating(false);
		})
		.catch((err) => setFetchError(err))
		.finally(() => setIsDataUpdating(false));
	}

	return(
		<div>
			{getLoader(isDataUpdating)}
			{getFetchError(fetchError)}
			<div className={root}>
				<div>
					<div className={align}>
						<div className={trbottomleft}></div>
						<div className={trbottomright}></div>
					</div>
					<div className={square}>
						<States states={states} stateSelected={stateSelected} getCitiesByState={getCitiesByState} />
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
});

export default withStyles(css)(Container);