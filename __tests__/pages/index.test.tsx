import { render, screen } from '@testing-library/react';
import Home from '../../src/pages/index';
import '@testing-library/jest-dom';
import React from 'react';

describe('Home', () => {
	it('renders a heading', () => {
		render(<Home />);

		const heading = screen.getByRole('heading', {
			name: 'Welcome to Fast Health',
		});

		expect(heading).toBeInTheDocument();
	});
});
