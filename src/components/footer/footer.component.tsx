import * as React from "react";
/* tslint:disable no-submodule-imports */
import withStyles from "isomorphic-style-loader/withStyles";
import content from "../../locale/en.prod.locale.json";
import css from "./footer.module.css";

const Footer = () => {
	const {root} = css;
	const {footerDescription} = content;
	return <div className={root}><h4>{footerDescription}</h4></div>
};

export default withStyles(css)(Footer);