import * as React from "react";
import styleable from "react-styleable";
import css from "./states.module.css";

export interface StateProps { states: any[], getCitiesByState: (state: string) => void, css: any}

const States = (props: StateProps) => {
	const {states, getCitiesByState, css: {root}} = props;
	const statesList = states.map((d) =>
		<a key={d.state} onClick={() => props.getCitiesByState(d.state)}>
			{d.state}
		</a>
	);
	return <div className={root}>{statesList}</div>
};

export default styleable(css)(States);