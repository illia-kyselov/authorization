import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import { useAuth } from '../../core/hooks/useAuth';
import { vi, describe, it, expect } from 'vitest';
import { useNavigate } from '@tanstack/react-router';

vi.mock('../../core/hooks/useAuth');
vi.mock('@tanstack/react-router');

describe('HomePage', () => {
    const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    const mockedUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

    it('should display welcome message with current user', () => {
        mockedUseAuth.mockReturnValue({
            currentUser: 'admin',
            logout: vi.fn(),
            login: vi.fn(),
        });

        render(<HomePage />);

        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toHaveTextContent('Welcome to home page, admin!');
    });

    it('should call logout and navigate to /login when logout button is clicked', () => {
        const logoutMock = vi.fn();
        const navigateMock = vi.fn();
        mockedUseAuth.mockReturnValue({
            currentUser: 'admin',
            logout: logoutMock,
            login: vi.fn(),
        });
        mockedUseNavigate.mockReturnValue(navigateMock);

        render(<HomePage />);

        const logoutButton = screen.getByText(/Log out/i);
        fireEvent.click(logoutButton);

        expect(logoutMock).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith({ to: '/login' });
    });

    it('should display guest message when currentUser is null', () => {
        mockedUseAuth.mockReturnValue({
            currentUser: null,
            logout: vi.fn(),
            login: vi.fn(),
        });

        render(<HomePage />);

        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toHaveTextContent('Welcome to home page, Guest!');
    });
});
