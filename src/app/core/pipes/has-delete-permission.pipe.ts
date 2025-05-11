import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

@Pipe({
  name: 'hasDeletePermission',
})
export class HasDeletePermission implements PipeTransform {

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

  transform(value: string): boolean {
    if (!value) return false;
    
    return this.authenticationService.hasDeleteAccess(value);
  }
}
