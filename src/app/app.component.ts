import { Component } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  RouterOutlet,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { bootstrapApplication } from '@angular/platform-browser';
import routes from './app.routes';
import { ToastrModule, provideToastr } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MenuComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withDebugTracing()
    ),
  ],
});
