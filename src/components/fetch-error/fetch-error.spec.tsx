import React from 'react';
import renderer from 'react-test-renderer';

import FetchError from './fetch-error.component';

describe('Fetch Error', () => {
	it('renders component and compare with snapshot', () => {
		const component = renderer.create(<FetchError/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});