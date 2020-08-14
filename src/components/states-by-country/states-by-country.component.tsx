import * as React from "react";
/* tslint:disable no-submodule-imports */
import withStyles from "isomorphic-style-loader/withStyles";
import css from "./states-by-country.module.css";

export interface StateByCountryProps { states: string[], stateSelected: string, getCitiesByState: (state: string) => void};

const StatesByCountry = (props: StateByCountryProps) => {
	const {states, getCitiesByState, stateSelected} = props;
	const {root, selected} = css;
	const statesList = states.map((state) =>
		<a key={state} className={state === stateSelected ? selected : ""} onClick={() => props.getCitiesByState(state)}>
			{state}
		</a>
	);
	return <div className={root}>{statesList}</div>
};

export default withStyles(css)(StatesByCountry);