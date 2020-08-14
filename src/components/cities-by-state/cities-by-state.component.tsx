import * as React from "react";
/* tslint:disable no-submodule-imports */
import withStyles from "isomorphic-style-loader/withStyles";
import css from "./cities-by-state.module.css";

export interface CitiesByStateProps { cities: string[], citySelected: string, getWeatherPollutionByCity: (country: string) => void};

const CitiesByState = (props: CitiesByStateProps) => {
	const {root, selected} = css;
	const {cities, getWeatherPollutionByCity, citySelected} = props;
	const listItems = cities.map((city) =>
		<a key={city} className={city === citySelected ? selected : ""} onClick={() => getWeatherPollutionByCity(city)}>
			{city}
		</a>
	);
	return <div className={root}>{listItems}</div>
};

export default withStyles(css)(CitiesByState);