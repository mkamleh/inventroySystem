import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  // loginForm = new FormGroup({
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  //   ]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8),
  //   ]),
  // });
  // checkForErrorsIn(
  //   formControl: AbstractControl<string | null, string | null> | null
  // ): string {
  //   if (
  //     formControl &&
  //     (formControl.dirty || formControl.touched) &&
  //     formControl.hasError('required')
  //   ) {
  //     return 'value is required';
  //   }
  //   if (
  //     formControl &&
  //     (formControl.dirty || formControl.touched) &&
  //     formControl.hasError('pattern')
  //   ) {
  //     return 'must be email';
  //   }
  //   if (
  //     formControl &&
  //     (formControl.dirty || formControl.touched) &&
  //     formControl.hasError('minlength')
  //   ) {
  //     return 'must be atleast 8 characters';
  //   }
  //   return '';
  // }
  // submit() {
  //   console.log(this.loginForm);
  // }
  //   @Output() submitEM = new EventEmitter();
}
