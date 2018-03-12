import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../../service/user.service';
import { AppConfig } from '../../config/app.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../model/User.model';

@Component({
    selector: 'add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
    addUserForm: FormGroup;
    error: string;
    addUser() {

    }
}