import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import { useAuth } from '../../core/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../../core/hooks/useAuth');
vi.mock('@tanstack/react-router');

describe('LoginPage', () => {
    const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
    const mockedUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

    it('should render login form', () => {
        mockedUseAuth.mockReturnValue({
            login: vi.fn(),
            logout: vi.fn(),
            currentUser: null,
        });

        render(<LoginPage />);

        expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
        expect(screen.getByText('Log In')).toBeInTheDocument();
    });

    it('should call login and navigate to / on successful login', () => {
        const loginMock = vi.fn((_username, _password, callback) => {
            callback(true);
        });
        const navigateMock = vi.fn();
        mockedUseAuth.mockReturnValue({
            login: loginMock,
            logout: vi.fn(),
            currentUser: null,
        });
        mockedUseNavigate.mockReturnValue(navigateMock);

        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText('Enter username'), {
            target: { value: 'admin' },
        });
        fireEvent.change(screen.getByPlaceholderText('Enter password'), {
            target: { value: 'admin' },
        });
        fireEvent.click(screen.getByText('Log In'));

        expect(loginMock).toHaveBeenCalledWith('admin', 'admin', expect.any(Function));
        expect(navigateMock).toHaveBeenCalledWith({ to: '/' });
    });

    it('should display error message on failed login', () => {
        const loginMock = vi.fn((_username, _password, callback) => {
            callback(false);
        });
        mockedUseAuth.mockReturnValue({
            login: loginMock,
            logout: vi.fn(),
            currentUser: null,
        });

        render(<LoginPage />);

        fireEvent.change(screen.getByPlaceholderText('Enter username'), {
            target: { value: 'wronguser' },
        });
        fireEvent.change(screen.getByPlaceholderText('Enter password'), {
            target: { value: 'wrongpassword' },
        });
        fireEvent.click(screen.getByText('Log In'));

        expect(loginMock).toHaveBeenCalledWith('wronguser', 'wrongpassword', expect.any(Function));
        expect(screen.getByText('Invalid login or password')).toBeInTheDocument();
    });
});
