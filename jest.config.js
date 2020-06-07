module.exports = {
	setupFiles: ["<rootDir>/test-shim.js","<rootDir>/test-setup.js"],
	moduleFileExtensions: ["ts","tsx","js"],
	transform: {
		"^.+\\.(ts|tsx)$": "<rootDir>/test-preprocessor.js",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js"},
	testMatch: ["<rootDir>/src/components/**/*.spec.tsx"],
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy"
	}
};