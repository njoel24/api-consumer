import * as React from "react";
import styleable from "react-styleable";
import content from "../../content/en.prod.content.json";
import css from "./footer.module.css";

const Footer = (props: Record<string, any>) => {
	const {css: {root}} = props;
	const {footerDescription} = content;
	return <div className={root}><h4>{footerDescription}</h4></div>
};

export default styleable(css)(Footer);