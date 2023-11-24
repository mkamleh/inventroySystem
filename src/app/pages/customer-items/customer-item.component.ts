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
  constructor(public cart: CartService) {}
  ngOnInit(): void {
    this.cartTotalObservable.subscribe((total) => {
      this.cartTotal = total;
    });
  }
  collection: (Item & { quantity: number })[] = [
    {
      id: '1',
      name: 'milk',
      price: '3',
      category: 'diary',
      stock: '10',
      quantity: 0,
    },
    {
      id: '2',
      name: 'kitmat',
      price: '9',
      category: 'candy',
      stock: '5',
      quantity: 0,
    },
  ];

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
    this.cart.addItemToCart(this.collection[index]);
    this.collection[index].quantity = 0;
  }
}
