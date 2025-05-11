import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

@Pipe({
  name: 'hasCreatePermission',
})
export class HasCreatePermission implements PipeTransform {

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

  transform(value: string): boolean {
    if (!value) return false;
    
    return this.authenticationService.hasCreateAccess(value);
  }
}
