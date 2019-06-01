import { AuthService } from './services/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown Error Occured';
        if (error.error.errors[0].message) {
          errorMessage = error.error.errors[0].message;
        } else {
          errorMessage = 'Unknown Error Occured';
        }
        this.authService.getErrorMessage(errorMessage);
        return throwError(error);
      })
    );
  }
}
