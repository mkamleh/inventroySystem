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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { errorsHandling } from '../../HttpClient/errorHandler';
import { AuthService } from '../../auth/auth.server';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  collection: any;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      `Bearer ${this.authService.getData().token}`
    );

    this.httpClient
      .get('http://localhost:3000/transactions', { headers })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.collection = res;
          this.collection.unshift({
            id: 'id',
            amount: 'total amount',
            totalItems: 'total items sold',
          });
        },
        (error) => {
          console.log(error);
          errorsHandling(error);
        }
      );
  }
}
