import * as React from "react";
import styleable from "react-styleable";
import css from "./footer.module.css";

const Footer = (props: any) => {
	const {css: {root}} = props;
	return <div className={root}><h4>Data kindly provided by IQAir.</h4></div>
};

export default styleable(css)(Footer);