import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export class AuthService {
    private currentUser: string | null = null;

    login(username: string, password: string): Observable<{ username: string } | null> {
        if (username === 'admin' && password === 'admin') {
            return of({ username }).pipe(
                delay(1000),
                map(user => {
                    this.currentUser = user.username;
                    sessionStorage.setItem('currentUser', user.username);
                    return user;
                })
            );
        } else {
            return of(null).pipe(delay(1000));
        }
    }

    getCurrentUser(): string | null {
        if (!this.currentUser) {
            this.currentUser = sessionStorage.getItem('currentUser');
        }
        return this.currentUser;
    }

    logout(): void {
        this.currentUser = null;
        sessionStorage.removeItem('currentUser');
    }
}
