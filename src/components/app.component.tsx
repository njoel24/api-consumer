import React from "react";
import styleable from "react-styleable";
import Header from "./header/header.component";
import Footer from "./footer/footer.component";
import Container from "./container/container.component";
import css from "./app.module.css";

export interface AppProps { css: Record<string, any> };

const App = (props: AppProps) => {
	const {css: {root}} = props;

	return (
		<div className={root}>
			<Header/>
			<Container/>
			<Footer/>
		</div>
	)
};

export default styleable(css)(App);