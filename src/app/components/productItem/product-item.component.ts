import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() item: Item;
  @Output() deleteItemEvent = new EventEmitter<string>();
  @Output() updateItemEvent = new EventEmitter<string>();

  deleteItem(id: string) {
    if (id === '-1') {
      return;
    }
    this.deleteItemEvent.emit(id);
  }
  updateItem(id: string) {
    if (id === '-1') {
      return;
    }

    this.updateItemEvent.emit(id);
  }
}

export interface Item {
  id: string;
  name: string;
  price: string;
  stock: string;
  category: string;
}
