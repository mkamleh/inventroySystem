import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = '';
  userRoles: string[] = [];
  authSubject = new BehaviorSubject<string[]>([]);

  setData(token: string, roles: string[]) {
    this.token = token;
    this.userRoles = roles;
    this.authSubject.next(roles);
  }

  getData() {
    return { token: this.token, roles: this.userRoles };
  }

  getRoles() {
    return this.authSubject.asObservable();
  }
}
