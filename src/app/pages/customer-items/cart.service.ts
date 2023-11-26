import { Inject, Injectable } from '@angular/core';
import { Item } from '../../components/productItem/product-item.component';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.server';
import Swal from 'sweetalert2';
import { errorsHandling } from '../../HttpClient/errorHandler';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: (Item & { quantity: number })[] = [];
  total = new BehaviorSubject<number>(0);

  addItemToCart(itemToAdd: Item & { quantity: number }) {
    let index: number = this.cart.findIndex((item) => item.id == itemToAdd.id);
    console.log(itemToAdd, 'iteeem');
    index > -1
      ? (this.cart[index].quantity += itemToAdd.quantity)
      : this.cart.push(itemToAdd);

    this.total.next(
      this.total.value +
        Number(itemToAdd.quantity) *
          Number(this.cart[index > -1 ? index : this.cart.length - 1].price)
    );

    console.log(this.cart, 'abood');
  }

  removeItemFromCart(itemToAdd: Item & { quantity: string }) {
    let index: number = this.cart.findIndex((item) => item.id == itemToAdd.id);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.total.next(
        this.total.value -
          Number(itemToAdd.quantity) * Number(this.cart[index].price)
      );
    }
  }

  returnTotal() {
    return this.total.asObservable();
  }

  returnCart() {
    return this.cart;
  }

  resetCart() {
    this.cart = [];
    this.total.next(0);
  }
}
