import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';

// Rest Api Service

// Date Format
import { DatePipe } from '@angular/common';
import { UserManagementService } from '../../services/user-management.service';
import { RESOURCES } from 'src/app/core/constants/resources';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: false
})

/**
 * List Component
 */
export class UserListComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  ordersForm!: UntypedFormGroup;
  masterSelected!: boolean;
  checkedList: any;
  submitted = false;

  // Api Data
  content?: any = [];
  lists?: any;
  econtent?: any;
  alllists: any;
  searchResults: any;
  searchTerm: any;
  date: any;
  status: any = '';

  resourceConstants = RESOURCES;

  constructor(
    protected readonly router: Router,
    private modalService: NgbModal,
    public service: PaginationService,
    private formBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>,
    public userManagementService: UserManagementService) {
  }

  ngOnInit(): void {
    this.userManagementService.getUsers().subscribe((res: any) => {
      console.log(res);
      this.content = res;
    });
  }

  addUser() {
    //navigate to user edit page
    this.router.navigate(['/user-management/user-edit']);
  }
}
