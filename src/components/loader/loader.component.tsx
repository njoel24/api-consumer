import * as React from "react";
/* tslint:disable no-submodule-imports */
import withStyles from "isomorphic-style-loader/withStyles";
import css from "./loader.module.css";

const Loader = () => {
	return <div className={css.root}><div className={css.overlay}></div></div>
};

export default withStyles(css)(Loader);