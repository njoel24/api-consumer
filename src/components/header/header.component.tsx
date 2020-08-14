import * as React from "react";
/* tslint:disable no-submodule-imports */
import withStyles from "isomorphic-style-loader/withStyles";
import css from "./header.module.css";
import logo from "../../assets/logo.svg";

const Header = () => {
	const {root} = css;
	return (
		<div className={root}>
			<img src={logo}/>
		</div>
	)
};

export default withStyles(css)(Header);