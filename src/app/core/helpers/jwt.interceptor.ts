import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private AuthenticationService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.AuthenticationService.getToken()).pipe(
      switchMap(token => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
              'X-Tenant-ID': 'egans-prod'
            }
          });
        }
        console.log('Request with token:', request);
        return next.handle(request);
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle 401 or 403 errors
        if (error.status === 401 || error.status === 403) {
          this.AuthenticationService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}

// Add missing import
import { from } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
