import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import Container from './container.component';

const mockData = [{state: "Basel-Landschaft"}];
const myAxios = () => Promise.resolve(mockData);
jest.mock('axios', myAxios);

describe('Container', () => {
	let component: ReactTestRenderer;

	beforeEach(() => {
		component = renderer.create(<Container/>);
	});

	afterEach(() => {
		jest.resetAllMocks();
		jest.restoreAllMocks();
	});

	it('renders component and compare with snapshot', () => {
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should run an effect right after rendering and invoke axios within that effect', async () => {
		setTimeout(() => {
			expect(JSON.stringify(component)).toMatch("Basel-Landschaft");
		}, 5000);
	});
});