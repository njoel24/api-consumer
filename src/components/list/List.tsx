import * as React from "react";
import styleable from "react-styleable";
import css from "./list.module.css";

export interface ListProps { list: any[], getDetail: (state: string) => void, css: any}

const List = (props: ListProps) => {
	const listItems = props.list.map((d) =>
		<a key={d.state} onClick={() => props.getDetail(d.state)}>
			{d.state}
		</a>
	);
	return <div className={props.css.root}>{listItems}</div>
};

export default styleable(css)(List);