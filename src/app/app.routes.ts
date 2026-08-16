import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./intro/intro.component').then(m => m.IntroComponent), pathMatch: 'full' },
  { path: 'game', loadComponent: () => import('./concurso/concurso.component').then(m => m.ConcursoComponent) },
  { path: 'premio', loadComponent: () => import('./premio/premio.component').then(m => m.PremioComponent) },
  { path: 'qr', loadComponent: () => import('./qr/qr.component').then(m => m.QrComponent) },
  { path: '**', redirectTo: '' }
];
