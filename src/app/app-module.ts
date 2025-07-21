import { NgModule } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { App } from './app';
import { PagesModule } from './pages/pages-module';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    RouterOutlet,
    MatSlideToggle,
    MatToolbarModule,
    PagesModule
  ],
  bootstrap: [App],
    providers: [
    provideHttpClient({ ...withInterceptorsFromDi() }),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
})
export class AppModule {

}
