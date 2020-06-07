import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Header from './header.component';

describe('Header', () => {
	it('renders component and compare with snapshot', () => {
		const component = renderer.create(<Header/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('renders a logo', () => {
		const wrapper = mount(
			<Header/>
		);
		expect(wrapper.containsMatchingElement(<img src="logo.svg"/>)).toBe(true);
	});
});