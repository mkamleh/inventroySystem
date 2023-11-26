import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MenuLinkComponent } from '../menu-link/menu-link.component';
import { MenuService } from './menu.service';
import { AuthService } from '../../auth/auth.server';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuLinkComponent,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],

  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  showFiller = false;
  events: string[] = [];
  opened: boolean;
  admin = false;
  manager = false;
  user = false;
  token: string | null = null;
  roles = this.authService.getRoles().subscribe((roles: string[]) => {
    console.log(roles, 'menu');
    this.admin = roles.includes('admin');
    this.manager = roles.includes('manager');
    this.user = roles.includes('user');
    this.token = this.authService.getData().token;
  });
  falll = { exact: false };

  constructor(
    public menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) {}

  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.menuService.isExpanded;
  }

  signout() {
    this.authService.setData('', []);
    this.router.navigate(['/']);
  }
}
