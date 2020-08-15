import path from 'path';
import fs from 'fs';
import express from "express";
import https from "https";
import React from 'react';
/* tslint:disable no-submodule-imports */
import { renderToString } from "react-dom/server";
import StyleContext from "isomorphic-style-loader/StyleContext";
import App from "../components/app.component";

const PORT = process.env.PORT !== undefined ? process.env.PORT : 3006;
const server = express();

server.get('/', (_: any, res: any) => {
	const css = new Set();

	const insertCss = (...styles: any) => styles.forEach((style: any) => css.add(style._getCss()))

	const myApp = renderToString(
		<StyleContext.Provider value={{ insertCss }}>
			<App />
		</StyleContext.Provider>
	)

	const indexFile = path.resolve('./dist/index.html');
	try {
		fs.readFile(indexFile, 'utf8', (e, data) => {
		return res.status(200).send(
			data.replace('<div id="root"></div>', `<div id="root">${myApp}</div>`).replace('<style></style>', `<style>${[...css].join('')}</style>`));
		});
	} catch (err) {
		/* tslint:disable no-console */
		console.error('Something went wrong:', err);
		return res.status(500).send('Oops, better luck next time!');
	}
});

server.use(express.static("./dist"));

https.createServer({
		key: fs.readFileSync('./keys/server.key'),
		cert: fs.readFileSync('./keys/server.cert')
	  }, server)
	  .listen(PORT, () => {
		/* tslint:disable no-console */
		console.log(`Server is listening on port ${PORT}`);
  	});