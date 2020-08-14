import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.component';

describe('Header', () => {
	it('renders component and compare with snapshot', () => {
		const component = renderer.create(<Header/>);
		const tree = component.toJSON() as any;
		expect(tree).toMatchSnapshot();
	});

	it('renders a logo', () => {
		const component = renderer.create(<Header/>);
		const tree = component.toJSON() as any;
		expect(tree.children[0].props.src).toBe("test-file-stub");
	});
});