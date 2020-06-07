import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './footer.component';

describe('Footer', () => {
	it('renders component and compare with snapshot', () => {
		const component = renderer.create(<Footer/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});