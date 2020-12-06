import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {
  }

  postUser(user: User) {
    return this.http.post(`${environment.apiBaseUrl}/register`, user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(`${environment.apiBaseUrl}/authenticate`, authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(`${environment.apiBaseUrl}/userProfile`);
  }

  getUsers() {
    return this.http.get(`${environment.apiBaseUrl}/users`);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
