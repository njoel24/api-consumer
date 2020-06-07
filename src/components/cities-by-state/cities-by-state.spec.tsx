import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from "enzyme";

import Cities, { CitiesByStateProps } from './cities-by-state.component';

describe('City by state', () => {
	const cities = ['Milan', 'Turin', 'Naples'];
	const getWeatherPollutionByCity = jest.fn();

	it('renders component and compare with snapshot', () => {
		const component = renderer.create(<Cities cities={cities}/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should render links', () => {
		const wrapper = mount(
			<Cities cities={cities} />
		);
		const links = wrapper.find('a');
		expect(links.length).toBe(3);
	});

	it('should print cities', () => {
		const wrapper = mount(
			<Cities cities={cities}/>
		);
		wrapper.find('a').forEach((singleLink) => {
			expect(singleLink.text()).not.toBeNull();
		});
	});

	it('should ask for detail by clicking on a link', () => {
		const wrapper = mount(
			<Cities cities={cities} getWeatherPollutionByCity={getWeatherPollutionByCity}/>
		);
		const firstLink = wrapper.find("a:first-child");
		firstLink.simulate("click");
		expect(getWeatherPollutionByCity).toBeCalled();
	});
});