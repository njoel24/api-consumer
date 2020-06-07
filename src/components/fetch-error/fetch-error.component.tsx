import * as React from "react";
import styleable from "react-styleable";
import content from "../../content/en.prod.content.json";
import css from "./fetch-error.module.css";

const FetchError = (props: Record<string, any>) => {
	const {css: {root}} = props;
	const {fetchErrorDescription} = content;
	return <div className={root}><h4>{fetchErrorDescription}</h4></div>
};

export default styleable(css)(FetchError);