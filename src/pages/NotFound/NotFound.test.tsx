import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { vi } from 'vitest';

vi.mock('@tanstack/react-router', () => ({
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
}));

describe('NotFound', () => {
    it('should render not found message and link to home', () => {
        render(<NotFound />);

        expect(screen.getByText(/Sorry, the page you are looking for doesn't exist/i)).toBeInTheDocument();
        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.getAttribute('href')).toBe('/');
    });
});
