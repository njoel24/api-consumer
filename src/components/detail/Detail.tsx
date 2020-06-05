import * as React from "react";
import styleable from "react-styleable";
import css from "./detail.module.css";

export interface DetailProps { detail: any[], css: any };

const Detail = (props: DetailProps) => {
	const listItems = props.detail.map((d) =>
		<a key={d.city}>
			{d.city}
		</a>
	);
	return <div className={props.css.root}>{listItems}</div>
};

export default styleable(css)(Detail);