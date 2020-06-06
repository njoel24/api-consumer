import * as React from "react";
import styleable from "react-styleable";
import css from "./cities.module.css";

export interface FirstLevelDetailProps { cities: any[], getWeatherPollutionByCity: (country: string) => void, css: any };

const Cities = (props: FirstLevelDetailProps) => {
	const {cities, css, getWeatherPollutionByCity} = props;
	const listItems = cities.map((d) =>
		<a key={d.city} onClick={() => getWeatherPollutionByCity(d.city)}>
			{d.city}
		</a>
	);
	return <div className={css.root}>{listItems}</div>
};

export default styleable(css)(Cities);