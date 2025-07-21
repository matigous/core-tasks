import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list').then(m => m.List)
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./pages/details/details').then(m => m.Details)
  }
];
