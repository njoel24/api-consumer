import * as React from "react";
import styleable from "react-styleable";
import css from "./loader.module.css";

const Loader = (props: any) => {
	return <div className={props.css.root}><div className={props.css.overlay}></div></div>
};

export default styleable(css)(Loader);