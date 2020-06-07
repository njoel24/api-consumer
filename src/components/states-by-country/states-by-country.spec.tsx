import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from "enzyme";

import StatesByCountry from './states-by-country.component';

describe('States by country', () => {
	const states = ['Alabama', 'Minnesota', 'Texas'];
	const getCitiesByState = jest.fn();

	it('renders component and compare with snapshot', () => {
		const component = renderer.create(<StatesByCountry states={states}/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should render states', () => {
		const wrapper = mount(
			<StatesByCountry states={states} />
		);
		const links = wrapper.find('a');
		expect(links.length).toBe(3);
	});

	it('should print states', () => {
		const wrapper = mount(
			<StatesByCountry states={states}/>
		);
		wrapper.find('a').forEach((singleLink) => {
			expect(singleLink.text()).not.toBeNull();
		});
	});

	it('should ask for city by clicking on a link', () => {
		const wrapper = mount(
			<StatesByCountry states={states} getCitiesByState={getCitiesByState}/>
		);
		const firstLink = wrapper.find("a:first-child");
		firstLink.simulate("click");
		expect(getCitiesByState).toBeCalled();
	});
});