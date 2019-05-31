import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    this.loginForm.reset();
  }

}
