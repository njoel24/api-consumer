import * as React from "react";
/* tslint:disable no-submodule-imports */
import withStyles from "isomorphic-style-loader/withStyles";
import content from "../../locale/en.prod.locale.json";
import css from "./fetch-error.module.css";

const FetchError = () => {
	const {root} = css;
	const {fetchErrorDescription} = content;
	return <div className={root}><h4>{fetchErrorDescription}</h4></div>
};

export default withStyles(css)(FetchError);