import React from 'react';
import renderer from 'react-test-renderer';

import Container from './container.component';

describe('Container', () => {
	test('snapshot renders', () => {
		const component = renderer.create(<Container/>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});