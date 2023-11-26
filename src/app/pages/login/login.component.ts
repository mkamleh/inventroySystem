import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuComponent } from '../../components/menu/menu.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/auth.server';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MenuComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  checkForErrorsIn(
    formControl: AbstractControl<string | null, string | null> | null
  ): string {
    if (
      formControl &&
      (formControl.dirty || formControl.touched) &&
      formControl.hasError('required')
    ) {
      return 'value is required';
    }

    if (
      formControl &&
      (formControl.dirty || formControl.touched) &&
      formControl.hasError('pattern')
    ) {
      return 'must be email';
    }

    if (
      formControl &&
      (formControl.dirty || formControl.touched) &&
      formControl.hasError('minlength')
    ) {
      return 'must be atleast 8 characters';
    }
    return '';
  }

  submit() {
    console.log(this.loginForm);
    const body = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.httpClient.post('http://localhost:3000/auth/login', body).subscribe(
      (res: any) => {
        console.log(res);
        this.authService.setData(res.access_token, res.userType);
        res.userType.includes('manager')
          ? this.router.navigate(['/products'])
          : this.router.navigate(['/customer-items']);
      },
      (error) => {
        console.log(error);
        if (Array.isArray(error.error.message)) {
          error.error.message.forEach((msg: string) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: msg,
              showConfirmButton: false,
              timer: 1500,
            });
          });
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    );
  }
  //   @Output() submitEM = new EventEmitter();
}
