import * as React from "react";
import styleable from "react-styleable";
import css from "./footer.module.css";

const Footer = (props: any) => {
	const {css: {root}} = props;
	return <div className={root}><h1>Air Quality Indicator</h1></div>
};

export default styleable(css)(Footer);