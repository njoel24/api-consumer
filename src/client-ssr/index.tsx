import * as React from "react";
import * as ReactDOM from "react-dom";
/* tslint:disable no-submodule-imports */
import StyleContext from "isomorphic-style-loader/StyleContext";
import App from "../components/app.component";

const insertCss = (...styles: any) => () => styles && styles.map((style: any) => style && typeof style._insertCss === "function" && style._insertCss()).forEach(
	(dispose: any) => {
		if (typeof dispose === "function") {
			dispose();
		}
	}
);

ReactDOM.hydrate(
	<StyleContext.Provider value={{ insertCss }}>
		<App />
	</StyleContext.Provider>,
	document.getElementById('root')
)