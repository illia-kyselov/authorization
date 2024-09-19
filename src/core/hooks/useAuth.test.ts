import { renderHook, act } from '@testing-library/react';
import { useAuth, resetAuthState } from './useAuth';
import { container } from '../di/dependencyContainer/dependencyContainer';
import { AuthService } from '../auth/authService';
import { of } from 'rxjs';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('useAuth', () => {
    let authServiceMock: jest.Mocked<AuthService>;

    beforeEach(() => {
        authServiceMock = {
            login: vi.fn(),
            logout: vi.fn(),
            getCurrentUser: vi.fn(),
        } as unknown as jest.Mocked<AuthService>;

        container.registerSingleton<AuthService>('AuthService', authServiceMock);

        resetAuthState();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should initialize with current user from authService', () => {
        authServiceMock.getCurrentUser.mockReturnValue('admin');

        const { result } = renderHook(() => useAuth());

        expect(result.current.currentUser).toBe('admin');
    });

    it('should login successfully', async () => {
        authServiceMock.login.mockReturnValue(of({ username: 'admin' }));

        const { result } = renderHook(() => useAuth());

        let success: boolean | undefined;
        await act(async () => {
            result.current.login('admin', 'admin', (s: boolean) => {
                success = s;
            });
        });

        expect(authServiceMock.login).toHaveBeenCalledWith('admin', 'admin');
        expect(success).toBe(true);
        expect(result.current.currentUser).toBe('admin');
    });

    it('should fail to login with incorrect credentials', async () => {
        authServiceMock.login.mockReturnValue(of(null));

        const { result } = renderHook(() => useAuth());

        let success: boolean | undefined;
        await act(async () => {
            result.current.login('user', 'wrongpassword', (s: boolean) => {
                success = s;
            });
        });

        expect(authServiceMock.login).toHaveBeenCalledWith('user', 'wrongpassword');
        expect(success).toBe(false);
        expect(result.current.currentUser).toBeNull();
    });

    it('should logout correctly', () => {
        authServiceMock.getCurrentUser.mockReturnValue('admin');

        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.logout();
        });

        expect(authServiceMock.logout).toHaveBeenCalled();
        expect(result.current.currentUser).toBeNull();
    });
});
