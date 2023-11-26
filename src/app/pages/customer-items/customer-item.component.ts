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
import { MenuComponent } from '../../components/menu/menu.component';
import { Item } from '../../components/productItem/product-item.component';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.server';
import { Socket, io } from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { errorsHandling } from '../../HttpClient/errorHandler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MenuComponent,
  ],
  templateUrl: './customer-item.component.html',
  styleUrl: './customer-item.component.scss',
})
export class CustomerItems implements OnInit {
  cartTotalObservable: Observable<number> = this.cart.returnTotal();
  cartTotal: number = 0;
  socket: Socket;
  collection: (Item & { quantity: number })[];
  constructor(
    public cart: CartService,
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartTotalObservable.subscribe((total) => {
      this.cartTotal = total;
    });

    this.loadItems();
    this.socket = io('http://localhost:3000/test', {
      extraHeaders: {
        authorization: `Bearer ${this.authService.getData().token}`,
      },
    });
    this.socket.on('test', (res: any) => {
      this.collection = res.data;
      this.collection.forEach((element) => {
        element.quantity = 0;
      });
    });
  }

  changeQuantity(action: 'add' | 'sub', index: number) {
    if (
      action === 'add' &&
      this.collection[index].quantity + 1 <=
        Number(this.collection[index].stock)
    ) {
      this.collection[index].quantity += 1;
    }

    if (action === 'sub' && this.collection[index].quantity - 1 >= 0) {
      this.collection[index].quantity -= 1;
    }
  }

  addToCart(index: number) {
    this.cart.addItemToCart({ ...this.collection[index] });
    this.collection[index].quantity = 0;
  }

  loadItems() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      `Bearer ${this.authService.getData().token}`
    );
    this.httpClient.get('http://localhost:3000/product', { headers }).subscribe(
      (res: any) => {
        this.collection = res.data;
        this.collection.forEach((element) => {
          element.quantity = 0;
        });
      },
      (error) => {
        console.log(error);
        errorsHandling(error);
      }
    );
  }

  checkout() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      `Bearer ${this.authService.getData().token}`
    );

    const body = {
      amount: this.cartTotal,
      products: this.cart.returnCart(),
    };

    this.httpClient
      .post('http://localhost:3000/transactions', body, {
        headers,
      })
      .subscribe(
        (res: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'done',
            showConfirmButton: false,
            timer: 1500,
          });
          this.cart.resetCart();
        },
        (error) => {
          console.log(error);
          errorsHandling(error);
        }
      );
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
