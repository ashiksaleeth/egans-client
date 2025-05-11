import { Injectable } from '@angular/core';
import { AuthenticationService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInitService {
  constructor(public AuthenticationService: AuthenticationService) {}

  initializeApp(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.AuthenticationService.initializeKeycloak()
        .then(authenticated => {
          console.log('Keycloak initialized:', authenticated);
          if (authenticated) {
            this.AuthenticationService.routeBasedOnRole().subscribe({
              next: () => resolve(true),
              error: error => {
                console.error('Error during role-based routing:', error);
                resolve(false);
              }
            });
          } else {
            resolve(false);
          }
        })
        .catch(error => {
          console.error('Error initializing Keycloak:', error);
          reject(error);
        });
    });
  }
}