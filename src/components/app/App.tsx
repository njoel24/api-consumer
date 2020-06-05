import React, {useEffect, useState} from "react";
import styleable from "react-styleable";
import axios, {CancelToken}  from "axios";
import List from "../list/List";
import Detail from "../detail/Detail";
import css from "./app.module.css";

export interface AppProps { css: any };

const App = (props: AppProps) => {

	const [list, setList] = useState([]);
	const [detail, setDetail] = useState([]);
	const dataRequested = true;

	useEffect(() => {
		const ajaxRequest = axios.CancelToken.source();  
		const url = "https://api.airvisual.com/v2/states?country=usa&key=9eed15cc-6979-4c6b-8383-aebbdcd7a667";

		axios.get(url, { cancelToken: ajaxRequest.token })
		.then((res) => {
			const {data: {data}} = res;
			setList(data);
		}).catch((err) => console.warn(err));

		return () => {
			ajaxRequest.cancel()
		}
	}, [dataRequested])

	const getDetail = (detail: string): void => {
		const url = `https://api.airvisual.com/v2/cities?state=${detail}&country=usa&key=9eed15cc-6979-4c6b-8383-aebbdcd7a667`;
		axios.get(url)
		.then((res) => {
			const {data: {data}} = res;
			setDetail(data);
		}).catch((err) => console.warn(err));
	}

	return (
		<div className={props.css.root}>
			<List list={list} getDetail={getDetail} />,
			<Detail detail={detail} />
		</div>
	)
};

export default styleable(css)(App);