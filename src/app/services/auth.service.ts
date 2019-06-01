import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

interface ResData {
  data: any;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  token = null;
  userId = null;
  isError = false;

  isAdmin = false;
  isAdminChanged = new Subject<boolean>();
  errorChanged = new Subject<boolean>();
  errorMessageChanged = new Subject<string>();
  errorMessage;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getIsAdminChanged() {
    return this.isAdminChanged.asObservable();
  }

  getIsError() {
    return this.isError;
  }

  login(email: string, password: string) {
    const requestBody = {
      query: `
        query LoginUser($email: String!, $password: String!) {
          loginUser(userInput: {email: $email, password: $password}) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    return this.http.post('/graphql', requestBody, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe((res: ResData) => {
      localStorage.setItem('userId', res.data.loginUser.userId);
      localStorage.setItem('token', res.data.loginUser.token);
      const now = new Date();
      const expDate = new Date(now.getTime() + (1 * 60 * 60 * 1000)).toISOString();
      localStorage.setItem('expDate', expDate);
      setTimeout(() => {
        this.logout();
      }, 3600 * 1000);
      this.token = res.data.loginUser.token;
      this.userId = res.data.loginUser.userId;
      this.isAdmin = true;
      this.isAdminChanged.next(true);
      this.router.navigate(['/create-route']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expDate');
    this.token = null;
    this.userId = null;
    this.isAdmin = false;
    this.isAdminChanged.next(false);
    this.router.navigate(['/']);
  }


  autoAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return this.logout();
    }
      const now = new Date();
      const expDate = localStorage.getItem('expDate');
      const timeRemaining = new Date(expDate).getTime() - now.getTime();
      if (timeRemaining > 0) {
        setTimeout(() => {
          this.logout();
        }, timeRemaining);
        this.isAdmin = true;
        this.isAdminChanged.next(true);
        this.token = localStorage.getItem('token');
        this.userId = localStorage.getItem('userId');
      } else {
        this.logout();
      }
  }

  getErrorMessage(message) {
    this.isError = true;
    this.errorChanged.next(true);
    this.errorMessage = message;
    this.errorMessageChanged.next(message);
  }

  getMessage() {
    return this.errorMessage;
  }

  onCloseError() {
    this.isError = false;
    this.errorChanged.next(false);
    this.errorMessage = '';
    this.errorMessageChanged.next('');
  }
}
