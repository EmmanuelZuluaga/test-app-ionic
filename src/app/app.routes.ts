import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
    {
    path: 'gestion-tareas',
    loadComponent: () => import('./todolist/todolist.component').then((m) => m.TodolistComponent),
  },
      {
    path: 'gestion-categorias',
    loadComponent: () => import('./category/category.component').then((m) => m.CategoryComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
