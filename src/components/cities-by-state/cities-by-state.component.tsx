import * as React from "react";
import styleable from "react-styleable";
import css from "./cities-by-state.module.css";

export interface CitiesByStateProps { cities: string[], citySelected: string, getWeatherPollutionByCity: (country: string) => void, css: Record<string, any> };

const CitiesByState = (props: CitiesByStateProps) => {
	const {cities, css: {root, selected}, getWeatherPollutionByCity, citySelected} = props;
	const listItems = cities.map((city) =>
		<a key={city} className={city === citySelected ? selected : ""} onClick={() => getWeatherPollutionByCity(city)}>
			{city}
		</a>
	);
	return <div className={root}>{listItems}</div>
};

export default styleable(css)(CitiesByState);