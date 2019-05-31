import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

interface ResData {
  data: any
}

@Injectable({providedIn: 'root'})
export class AuthService {
  token = null;
  userId = null;

  isAdmin = false;
  isAdminChanged = new Subject<boolean>();

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

    return this.http.post('http://localhost:8080/graphql', requestBody, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe((res: ResData) => {
      this.token = res.data.loginUser.token;
      this.userId = res.data.loginUser.token;
      this.isAdmin = true;
      this.isAdminChanged.next(true);
      this.router.navigate(['/create-route']);
    });
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.isAdmin = false;
    this.isAdminChanged.next(false);
    this.router.navigate(['/']);
  }
}
