import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  errorMessage: string;
  subscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.errorMessage = this.authService.getMessage();
    this.subscription = this.authService.errorMessageChanged.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCloseError() {
    this.authService.onCloseError();
  }

}
