import { useEffect, useState } from 'react';
import { container } from '../di/dependencyContainer/dependencyContainer';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/authService';

const authState$ = new BehaviorSubject<string | null>(null);

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const authService = container.resolve<AuthService>('AuthService');

    useEffect(() => {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
            authState$.next(storedUser);
        }

        const subscription = authState$.subscribe(user => setCurrentUser(user));
        return () => subscription.unsubscribe();
    }, [authService]);

    const login = (username: string, password: string, callback: (success: boolean) => void) => {
        authService.login(username, password).subscribe(user => {
            if (user) {
                authState$.next(user.username);
                sessionStorage.setItem('currentUser', user.username);
                callback(true);
            } else {
                callback(false);
            }
        });
    };

    const logout = () => {
        authService.logout();
        authState$.next(null);
    };

    return { currentUser, login, logout };
};

export const resetAuthState = () => {
    authState$.next(null);
};
