import React from 'react';
import renderer from 'react-test-renderer';

import Loader from './loader.component';

describe('Loader', () => {
	it('renders component and compare with snapshot', () => {
		const component = renderer.create(<Loader/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});