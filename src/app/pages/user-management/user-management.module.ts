import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Component pages
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleUpdateComponent } from './roles/role-update/role-update.component';


import {DatePipe} from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { HasCreatePermission } from 'src/app/core/pipes/has-create-permission.pipe';

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    RoleListComponent,
    RoleEditComponent,
    RoleUpdateComponent,
    HasCreatePermission
  ],
  imports: [
    UserManagementRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbTooltipModule,
  ],
  exports: [
    UserListComponent,
    UserEditComponent,
    RoleListComponent,
    RoleEditComponent,
    RoleUpdateComponent
  ],
  providers: [
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserManagementModule { 
}
