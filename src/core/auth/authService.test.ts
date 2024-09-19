import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { AuthService } from './authService';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();

        const sessionStorageMock = (() => {
            let store: { [key: string]: string } = {};

            return {
                getItem: (key: string) => store[key] || null,
                setItem: (key: string, value: string) => {
                    store[key] = value.toString();
                },
                removeItem: (key: string) => {
                    delete store[key];
                },
                clear: () => {
                    store = {};
                },
            };
        })();

        Object.defineProperty(global, 'sessionStorage', {
            value: sessionStorageMock,
            writable: true,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('login', () => {
        it('should login successfully with correct credentials', async () => {
            const username = 'admin';
            const password = 'admin';

            const result$ = authService.login(username, password);

            const result = await firstValueFrom(result$);

            expect(result).toEqual({ username });
            expect(authService.getCurrentUser()).toBe(username);
            expect(sessionStorage.getItem('currentUser')).toBe(username);
        });

        it('should fail to login with incorrect credentials', async () => {
            const username = 'user';
            const password = 'password';

            const result$ = authService.login(username, password);

            const result = await firstValueFrom(result$);

            expect(result).toBeNull();
            expect(authService.getCurrentUser()).toBeNull();
            expect(sessionStorage.getItem('currentUser')).toBeNull();
        });
    });

    describe('getCurrentUser', () => {
        it('should return currentUser when it is set', () => {
            authService['currentUser'] = 'admin';

            const currentUser = authService.getCurrentUser();

            expect(currentUser).toBe('admin');
        });

        it('should get currentUser from sessionStorage when currentUser is not set', () => {
            sessionStorage.setItem('currentUser', 'admin');

            const currentUser = authService.getCurrentUser();

            expect(currentUser).toBe('admin');
        });

        it('should return null when currentUser is not set and not in sessionStorage', () => {
            const currentUser = authService.getCurrentUser();

            expect(currentUser).toBeNull();
        });
    });

    describe('logout', () => {
        it('should clear currentUser and sessionStorage on logout', () => {
            authService['currentUser'] = 'admin';
            sessionStorage.setItem('currentUser', 'admin');

            authService.logout();

            expect(authService.getCurrentUser()).toBeNull();
            expect(sessionStorage.getItem('currentUser')).toBeNull();
        });
    });
});
