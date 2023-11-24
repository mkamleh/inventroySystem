import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { NgxPaginationModule } from 'ngx-pagination';
import {
  Item,
  ProductItemComponent,
} from '../../components/productItem/product-item.component';
import Swal from 'sweetalert2';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AddEditProductComponent } from '../../components/add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxPaginationModule,
    ProductItemComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  collection: Item[] = [
    { id: '1', name: 'milk', price: '3', category: 'food', stock: '100' },
    { id: '2', name: 'milk', price: '3', category: 'food', stock: '100' },
  ];
  p: number = 1;
  searchForm = new FormGroup({
    name: new FormControl('', []),
    priceFrom: new FormControl('', [Validators.minLength(1)]),
    priceTo: new FormControl('', [Validators.minLength(1)]),
    category: new FormControl('', []),
  });

  formFields = [
    { name: 'name', controlName: 'name' },
    { name: 'price from', controlName: 'priceFrom' },
    { name: 'price to', controlName: 'priceTo' },
    { name: 'category', controlName: 'category' },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.searchForm);
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
  submit() {}

  deleteItem(event: string | number) {
    console.log(event, 'delete');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your item has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  updateItem(event: string | number) {
    console.log(event, 'update');
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      height: '400px',
      width: '600px',
      data: { item: this.collection[Number(event)] },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  addItem() {
    console.log(event, 'update');
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
