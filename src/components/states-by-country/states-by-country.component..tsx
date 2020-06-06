import * as React from "react";
import styleable from "react-styleable";
import css from "./states-by-country.module.css";

export interface StateByCountryProps { states: any[], stateSelected: string, getCitiesByState: (state: string) => void, css: any}

const StatesByCountry = (props: StateByCountryProps) => {
	const {states, getCitiesByState, css: {root, selected}, stateSelected} = props;
	const statesList = states.map((state) =>
		<a key={state} className={state === stateSelected ? selected : ""} onClick={() => props.getCitiesByState(state)}>
			{state}
		</a>
	);
	return <div className={root}>{statesList}</div>
};

export default styleable(css)(StatesByCountry);