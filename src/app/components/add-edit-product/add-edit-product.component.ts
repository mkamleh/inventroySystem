import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Item } from '../productItem/product-item.component';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { AuthService } from '../../auth/auth.server';
import Swal from 'sweetalert2';
import { errorsHandling } from '../../HttpClient/errorHandler';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
  ],

  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent implements OnInit {
  searchForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  formFields = [
    { name: 'name', controlName: 'name' },
    { name: 'price', controlName: 'price' },
    { name: 'stock', controlName: 'stock' },
    { name: 'category', controlName: 'category' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddEditProductComponent>,
    private httpClient: HttpClient,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      type T = Omit<Item, 'id' | number>;
      Object.keys(this.data.item).forEach((key: string) => {
        if (key === 'id' || !key) {
          return;
        }
        let key2 = key as keyof T;
        this.searchForm.controls[key2].setValue(this.data.item[key2]);
      });
    }
  }

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
    return '';
  }
  submit() {}

  updateItem() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      `Bearer ${this.authService.getData().token}`
    );

    const body = {
      id: this.data.item.id,
      price: Number(this.searchForm.value.price) || 'wronge',
      category: this.searchForm.value.category,
      stock: Number(this.searchForm.value.stock) || 'wronge',
      name: this.searchForm.value.category,
    };
    this.httpClient
      .patch('http://localhost:3000/product', body, { headers })
      .subscribe(
        (res: any) => {
          this.dialogRef.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'done',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
          errorsHandling(error);
        }
      );
  }
  addItem() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      `Bearer ${this.authService.getData().token}`
    );

    const body = {
      price: Number(this.searchForm.value.price) || 'wronge',
      category: this.searchForm.value.category,
      stock: Number(this.searchForm.value.stock) || 'wronge',
      name: this.searchForm.value.category,
    };
    this.httpClient
      .post('http://localhost:3000/product', body, { headers })
      .subscribe(
        (res: any) => {
          this.dialogRef.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'done',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
          errorsHandling(error);
        }
      );
  }
}
