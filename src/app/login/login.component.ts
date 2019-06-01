import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('f') loginForm: NgForm;
  isError = false;
  subscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isError = this.authService.getIsError();
    this.subscription = this.authService.errorChanged.subscribe(error => {
      this.isError = error;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    this.loginForm.reset();
  }



}
