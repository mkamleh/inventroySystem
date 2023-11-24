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
    console.log('update');
    this.dialogRef.close();
  }
  addItem() {
    console.log('add');
    this.dialogRef.close();
  }
}
