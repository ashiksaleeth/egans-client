import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

@Pipe({
  name: 'hasUpdatePermission',
})
export class HasUpdatePermission implements PipeTransform {

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

  transform(value: string): boolean {
    if (!value) return false;
    
    return this.authenticationService.hasUpdateAccess(value);
  }
}
