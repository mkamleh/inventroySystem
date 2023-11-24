import { Component } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  RouterOutlet,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { bootstrapApplication } from '@angular/platform-browser';
import routes from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withDebugTracing()
    ),
  ],
});
