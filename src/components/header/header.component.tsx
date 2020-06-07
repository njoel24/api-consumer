import * as React from "react";
import styleable from "react-styleable";
import css from "./header.module.css";
import logo from "../../assets/logo.svg";

const Header = (props: Record<string, any>) => {
	const {css: {root}} = props;
	return (
		<div className={root}>
			<img src={logo}/>
		</div>
	)
};

export default styleable(css)(Header);