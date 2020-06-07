import * as React from "react";
import styleable from "react-styleable";
import { WeatherPollutionByCityProps } from "./weather-pollution-by-city.model";
import css from "./weather-pollution-by-city.module.css";
import content from "../../content/en.prod.content.json";

const WeatherPollutionByCity = (props: WeatherPollutionByCityProps) => {
	const {detail, css: {root}} = props;
	const {pollutionTitle, weatherTitle, stateTitle, countryTitle, cityTitle} = content;
	if (detail === null) {
		return <div className={root}></div>;
	}
	const {state, city, country, current: {pollution: {aqicn, aqius, maincn, mainus}, weather: {hu, ic, pr, tp, ts, wd, ws}}, location: {coordinates, type}} = detail;
	return <div className={root}>
		<div>{stateTitle}: <strong>{state}</strong></div>
		<div>{countryTitle}: <strong>{country}</strong></div>
		<div>{cityTitle}: <strong>{city}</strong></div>
		<div>
			<h4>{pollutionTitle}</h4>
			<div>aqicn: {aqicn}</div>
			<div>aqius: {aqius}</div>
			<div>maincn: {maincn}</div>
			<div>mainus: {mainus}</div>
		</div>
		<div>
			<h4>{weatherTitle}</h4>
			<div>hu: {hu}</div>
			<div>ic: {ic}</div>
			<div>pr: {pr}</div>
			<div>tp: {tp}</div>
			<div>ts: {ts}</div>
			<div>wd: {wd}</div>
			<div>ws: {ws}</div>
		</div>
	</div>
};

export default styleable(css)(WeatherPollutionByCity);