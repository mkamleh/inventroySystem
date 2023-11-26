import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from '../../components/add-edit-product/add-edit-product.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.server';
import { errorsHandling } from '../../HttpClient/errorHandler';
import { io } from 'socket.io-client';

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
export class ProductsComponent implements OnInit, OnDestroy {
  collection: Item[] = [];
  p: number = 1;
  socket: any;
  totalItems: number = 0;
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

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.searchForm);
    this.loadItems();
    this.socket = io('http://localhost:3000/test', {
      extraHeaders: {
        authorization: `Bearer ${this.authService.getData().token}`,
      },
    });
    this.socket.on('test', (res: any) => {
      console.log(res);
      this.collection = res.data;
      this.collection.unshift({
        id: 'nun',
        name: 'name',
        stock: 'stock',
        price: 'price',
        category: 'category',
      });
      this.totalItems = res.meta.totalPages;
      this.p = res.meta.currentPage;
    });
  }

  loadItems() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      `Bearer ${this.authService.getData().token}`
    );

    if (
      (this.searchForm.value.priceTo && !this.searchForm.value.priceFrom) ||
      (this.searchForm.value.priceFrom && !this.searchForm.value.priceTo) ||
      (this.searchForm.value.priceFrom &&
        !Number(this.searchForm.value.priceFrom)) ||
      (this.searchForm.value.priceTo && !Number(this.searchForm.value.priceTo))
    ) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'price to and from should be not empty to use price range',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    let link = `http://localhost:3000/product?filter.name=$sw:${this.searchForm.value.name}&filter.category=$sw:${this.searchForm.value.category}`;
    if (this.searchForm.value.priceTo && this.searchForm.value.priceFrom) {
      link += `&filter.price=$btw:${this.searchForm.value.priceFrom},${this.searchForm.value.priceTo}`;
    }
    this.httpClient.get(link, { headers }).subscribe(
      (res: any) => {
        console.log(res);
        this.collection = res.data;
        this.collection.unshift({
          id: '-1',
          name: 'name',
          stock: 'stock',
          price: 'price',
          category: 'category',
        });
        this.totalItems = res.meta.totalPages;
        this.p = res.meta.currentPage;
      },
      (error) => {
        console.log(error);
        errorsHandling(error);
      }
    );
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
  submit() {
    this.loadItems();
  }

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
        let headers = new HttpHeaders();
        headers = headers.set(
          'Authorization',
          `Bearer ${this.authService.getData().token}`
        );
        this.httpClient
          .delete(`http://localhost:3000/product/${event}`, { headers })
          .subscribe(
            (res: any) => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your item has been deleted.',
                icon: 'success',
              });
            },
            (error) => {
              console.log(error);
              errorsHandling(error);
            }
          );
      }
    });
  }

  updateItem(event: string | number) {
    console.log(event, 'update');
    console.log(this.collection, event);
    console.log();
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      height: '400px',
      width: '600px',
      data: {
        item: this.collection.filter((item) => item.id == event)[0],
      },
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

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
