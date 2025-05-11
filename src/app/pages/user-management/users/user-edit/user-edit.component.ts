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

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  standalone: false
})

/**
 * List Component
 */


export class UserEditComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  userForm!: UntypedFormGroup;
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

  
resourceConstants = RESOURCES;

  constructor(private modalService: NgbModal,
    public service: PaginationService,
    private formBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>,
    private datePipe: DatePipe,
    public userManagementService: UserManagementService) {
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Invoices' },
      { label: 'Invoice List', active: true }
    ];

    /**
     * Form Validation
     */
    this.userForm = this.formBuilder.group({
      id: [''],
      Email: ['', [Validators.required]],
      FirstName: [''],
      LastName: [''],
      MobileNo: ['']
    });
  }

  onSubmit() { debugger
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const formData = cloneDeep(this.userForm.value);
    this.userManagementService.saveUser(formData).subscribe((res) => {
      console.log(res);
      this.onReset();
      Swal.fire({
        title: 'Success!',
        text: 'User saved successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    })
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
}
