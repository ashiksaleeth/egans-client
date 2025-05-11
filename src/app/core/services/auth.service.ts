import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

export interface UserRole {
  role: string;
  defaultRoute: string;
}

export interface UserResource {
  resourceName: string;
  canRead: boolean;
  canDelete: boolean;
  canUpdate: boolean;
  canCreate: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userProfile = new BehaviorSubject<KeycloakProfile | null>(null);
  private userRole = new BehaviorSubject<UserRole | null>(null);

  public userResources: UserResource[] = [];
  
  userProfile$ = this.userProfile.asObservable();
  userRole$ = this.userRole.asObservable();

  constructor(
    private keycloak: KeycloakService,
    private http: HttpClient,
    private router: Router
  ) {}

  initializeKeycloak(): Promise<boolean> {
    console.log('Initializing Keycloak...');
    return this.keycloak.init({
      config: {
        url: "http://localhost:8080",
        realm: "egans-auth",
        clientId: "public-client",
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    });
  }

  loadUserProfile(): Observable<KeycloakProfile> {
    return from(this.keycloak.loadUserProfile()).pipe(
      tap(profile => {
        this.userProfile.next(profile);
        console.log('User profile loaded:', profile);
      })
    );
  }

  getUserRoles(): Observable<UserResource[]> {
    // Replace with your actual API endpoint
    return this.http.get<UserResource[]>('https://localhost:44381/api/User/1/resources').pipe(
      tap(userRole => {
        this.userRole.next({defaultRoute: '/user-management/user-list', role: "test-role"});
        this.userResources = userRole;
      }),
      catchError(error => {
        console.error('Error fetching user role:', error);
        // Provide a default role in case of error
        const defaultRole: UserRole = { role: 'user', defaultRoute: '/dashboard' };
        this.userRole.next(defaultRole);
        return of([]);
      })
    );
  }

  routeBasedOnRole(): Observable<boolean> {
    return this.loadUserProfile().pipe(
      switchMap(() => this.getUserRoles()),
      map(userRole => {
        this.router.navigate(['/user-management/user-list']);
        return true;
      })
    );
  }
  
  logout(): void {
    this.keycloak.logout(window.location.origin);
  }

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }

  isAuthenticated(): boolean {
    return this.keycloak.isLoggedIn();
  }

  getUsername(): string | undefined {
    return this.userProfile.getValue()?.username;
  }


  //region authorization methods
  hasReadAccess(resourceName: string): boolean {
    const resource = this.userResources.find((resource: UserResource) => resource.resourceName === resourceName);
    return resource ? resource.canRead : false;
  }

  hasCreateAccess(resourceName: string): boolean {
    const resource = this.userResources.find((resource: UserResource) => resource.resourceName === resourceName);
    return resource ? resource.canCreate : false;
  }

  hasUpdateAccess(resourceName: string): boolean {
    const resource = this.userResources.find((resource: UserResource) => resource.resourceName === resourceName);
    return resource ? resource.canUpdate : false;
  }

  hasDeleteAccess(resourceName: string): boolean {
    const resource = this.userResources.find((resource: UserResource) => resource.resourceName === resourceName);
    return resource ? resource.canDelete : false;
  }
}