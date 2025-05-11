import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleUpdateComponent } from './roles/role-update/role-update.component';
import { AuthResourceGuard } from 'src/app/core/guards/auth-resource.guard';
import { RESOURCES } from 'src/app/core/constants/resources';


const routes: Routes = [
    {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [AuthResourceGuard],
        data: {
            resource: RESOURCES.USER
        }
    },
    {
        path: 'user-edit',
        component: UserEditComponent
    },
    {
        path: 'role-list',
        component: RoleListComponent
    },
    {
        path: 'role-edit',
        component: RoleEditComponent
    },
    {
        path: 'role-update',
        component: RoleUpdateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserManagementRoutingModule { }
