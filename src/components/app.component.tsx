import React from "react";
/* tslint:disable no-submodule-imports */
import withStyles from "isomorphic-style-loader/withStyles";
import Header from "./header/header.component";
import Footer from "./footer/footer.component";
import Container from "./container/container.component";
import css from "./app.module.css";

const App = () => {
	const {root} = css;

	return (
		<div className={root}>
			<Header/>
			<Container/>
			<Footer/>
		</div>
	)
};

export default withStyles(css)(App);