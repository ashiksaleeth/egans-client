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

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  standalone: false
})

/**
 * List Component
 */
export class RoleListComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  ordersForm!: UntypedFormGroup;
  masterSelected!: boolean;
  checkedList: any;
  submitted = false;

  // Api Data
  content?: any;
  lists?: any;
  econtent?: any;
  alllists: any;
  searchResults: any;
  searchTerm: any;
  date: any;
  status: any = '';

  constructor(private modalService: NgbModal,
    public service: PaginationService,
    private formBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>,
    public userManagementService: UserManagementService) {
  }

  ngOnInit(): void {
    this.userManagementService.getRoles().subscribe((res: any) => {
      console.log(res);
      this.content = res;
    });
  }
}
