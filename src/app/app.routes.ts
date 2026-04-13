import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
    {
    path: 'list',
    loadComponent: () => import('./todolist/todolist.component').then((m) => m.TodolistComponent),
  },
      {
    path: 'modal',
    loadComponent: () => import('./modalcreatetask/modalcreatetask.component').then((m) => m.ModalcreatetaskComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
