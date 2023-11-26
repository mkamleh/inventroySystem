import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { NgModule, inject } from '@angular/core';
import { AdminGuard } from './auth/admin.gurad';
import { ManagerGuard } from './auth/manger.guard';
import { UserGuard } from './auth/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (m) => m.ProductsComponent
      ),
    canActivate: [ManagerGuard],
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports.component').then(
        (m) => m.ReportsComponent
      ),
    canActivate: [AdminGuard],
  },
  {
    path: 'customer-items',
    loadComponent: () =>
      import('./pages/customer-items/customer-item.component').then(
        (m) => m.CustomerItems
      ),
    canActivate: [UserGuard],
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
export default routes;
