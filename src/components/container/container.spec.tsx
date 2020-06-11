import React from 'react';
import renderer from 'react-test-renderer';
import Container from './container.component';

describe('Container', () => {
	it('renders component and compare with snapshot', () => {
		const component = renderer.create(<Container/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});