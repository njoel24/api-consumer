import * as React from "react";
import styleable from "react-styleable";
import { WeatherPollutionByCityProps } from "./weather-pollution-by-city.model";
import css from "./weather-pollution-by-city.module.css";

const WeatherPollutionByCity = (props: WeatherPollutionByCityProps) => {
	const {detail, css: {root}} = props;
	if (!detail) {
		return <div className={root}></div>;
	}
	const {state, city, country, current: {pollution: {aqicn,aqius,maincn,mainus}, weather: {hu,ic,pr,tp,ts,wd,ws}}, location: {coordinates, type}} = detail;
	return <div className={root}>
		<div>State: <strong>{state}</strong></div>
		<div>Country: <strong>{country}</strong></div>
		<div>City: <strong>{city}</strong></div>
		<div>
			<h1>Pollution</h1>
			<div>aqicn: {aqicn}</div>
			<div>aqius: {aqius}</div>
			<div>maincn: {maincn}</div>
			<div>mainus: {mainus}</div>
		</div>
		<div>
			<h1>Weather</h1>
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