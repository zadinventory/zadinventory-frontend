import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'produtos',
        loadComponent: () =>
          import(
            './features/produtos/produto-list/produto-list.component'
          ).then((m) => m.ProdutoListComponent),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import(
            './features/usuarios/usuario-list/usuario-list.component'
          ).then((m) => m.UsuarioListComponent),
      },
      {
        path: 'operacoes',
        loadComponent: () =>
          import(
            './features/operacoes/operacao-list/operacao-list.component'
          ).then((m) => m.OperacaoListComponent),
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./features/categorias/categoria-list.component').then(
            (m) => m.CategoriaListComponent
          ),
      },
      {
        path: 'tags',
        loadComponent: () =>
          import('./features/tags/tag-list.component').then(
            (m) => m.TagListComponent
          ),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
