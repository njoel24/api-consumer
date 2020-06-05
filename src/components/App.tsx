import React, {useEffect, useState} from "react";
import { List } from "./List";
import axios, {CancelToken}  from "axios";
export const App = () => {

	const [list, setList] = useState([]);
	const dataRequested = true;

	useEffect(() => {
		const ajaxRequest = axios.CancelToken.source();  
		const url = "https://api.airvisual.com/v2/states?country=italy&key=9eed15cc-6979-4c6b-8383-aebbdcd7a667";
		axios.get(url, { cancelToken: ajaxRequest.token })
		.then((res) => {
			const {data: {data}} = res;
			setList(data);
		}).catch((err) => console.warn(err));

		return () => {
			ajaxRequest.cancel()
		}
	}, [dataRequested])

	return (
		<div className="container">
			<List list={list} />,
		</div>
	)
};