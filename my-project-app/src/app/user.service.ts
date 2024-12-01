import { Injectable } from '@angular/core';
import { ProfileDetails, User } from './types/user';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  user$ = this.user$$.asObservable;
  USER_KEY = '[user]';

  user: User | null = null;
  userSubscription: Subscription | null = null;

 

  get isLogged(): boolean {
    return !!this.user;

  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`/api/users/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    username: string,
    email: string,
    tel: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<User>(`/api/users/register`, {
        username,
        email,
        tel,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }
  logout() {
    return this.http.get<User>(`/api/users/logout`, {}).pipe(
      tap((user) => {
        localStorage.removeItem('X-Authorization');
        this.user$$.next(null);
      })
    );
  }

  getProfile() {
    
    return this.http
      .get<User>('/api/users/me')
      .pipe(tap((user) => this.user$$.next(user)));
  }


  updateProfile(username: string, email: string, tel?: string) {
    return this.http
      .put<User>(`/api/users/me`, {
        username,
        email,
        tel,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
