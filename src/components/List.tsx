import * as React from "react";

export interface ListProps { list: any[]}

export const List = (props: ListProps) => {
	const listItems = props.list.map((d) =>
		<li key={d.state}>
			{d.state}
		</li>
	);
	return <div>{listItems}</div>
};