import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthenticationService } from "../services/auth.service";

// Auth Services

@Injectable({ providedIn: "root" })
export class AuthResourceGuard implements CanActivate {
  constructor(
    protected readonly router: Router,
    public authenticationService: AuthenticationService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    
    const requiredResource = route.data['resource'] as string;

    if (!requiredResource) {
      return true;
    }

    if(this.authenticationService.hasReadAccess(requiredResource)) {
      return true;
     }

    this.router.navigate(['/access-denied']);
    return false;
  }
}
