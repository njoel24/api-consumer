import React from 'react';
import renderer from 'react-test-renderer';

import WeatherAndPollutionByCity from './weather-pollution-by-city.component';

describe('States by country', () => {
	const detail = {
		city: "Milan",
		country: "Italy",
		state: "Lombardia",
		location: {},
		current: {pollution: {}, weather: {}}
	};

	it('renders component and compare with snapshot', () => {
		const component = renderer.create(<WeatherAndPollutionByCity detail={detail}/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});