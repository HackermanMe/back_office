import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../models/auth/login-request';
import { LoginResponse } from '../models/auth/login-response';
import { RegisterRequest } from '../models/auth/register-request';
import { GlobalResponse } from '../models/response/GlobalResponse';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(request: LoginRequest): Observable<GlobalResponse<LoginResponse>> {
    return this.http.post<GlobalResponse<LoginResponse>>(`${this.API_URL}/login`, request)
      .pipe(tap(response => {
        if (response.data) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          this.currentUserSubject.next(response.data);
        }
      }));
  }

  register(request: RegisterRequest): Observable<GlobalResponse<LoginResponse>> {
    return this.http.post<GlobalResponse<LoginResponse>>(`${this.API_URL}/register`, request);
  }

  logout() {
    const token = this.currentUserValue?.accessToken;
    if (token) {
      this.http.post(`${this.API_URL}/logout`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe();
    }
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  refreshToken(): Observable<GlobalResponse<LoginResponse>> {
    const refreshToken = this.currentUserValue?.refreshToken;
    return this.http.post<GlobalResponse<LoginResponse>>(`${this.API_URL}/refresh-token`, {}, {
      headers: { 'Authorization': `Bearer ${refreshToken}` }
    }).pipe(tap(response => {
      if (response.data) {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        this.currentUserSubject.next(response.data);
      }
    }));
  }
} 