import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { CurrentUser } from '../model/CurrentUser.model';
import { ProgressBarService } from '../core/progress-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string;
  progressBarMode: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private progressBarService: ProgressBarService) {

    this.loginForm = this.formBuilder.group({
      'userName': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });

    this.authenticationService.isLoggedIn.subscribe(val => {
      if (val) {
        this.router.navigate(['h']);
      }
    });

    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  signIn(currentUser: CurrentUser) {
    this.authenticationService.login(currentUser).subscribe((response) => {
      this.router.navigate(['h']);
      this.myNgForm.resetForm();
    }, (response: Response) => {
      if (response.status === 500) {
        this.progressBarMode = null;
        this.error = 'errorHasOcurred';
      } else if (response.status === 400 || 401) {
        this.progressBarMode = null;
        this.error = 'Bad Credentials';
      }
    });
  }
}
