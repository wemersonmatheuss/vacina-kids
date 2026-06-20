import { Routes } from '@angular/router';

import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/dashboard/pages/dashboard/dashboard.component'
          ).then((m) => m.DashboardComponent),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./features/profile/pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'campanhas/:id',
        loadComponent: () =>
          import(
            './features/campaigns/pages/campaign-details/campaign-details.component'
          ).then((m) => m.CampaignDetailsComponent),
      },
      {
        path: 'campanhas',
        loadComponent: () =>
          import(
            './features/campaigns/pages/campaigns-list/campaigns-list.component'
          ).then((m) => m.CampaignsListComponent),
      },
      {
        path: 'criancas/:childId/vacinas/:vaccineId',
        loadComponent: () =>
          import(
            './features/vaccines/pages/vaccine-details/vaccine-details.component'
          ).then((m) => m.VaccineDetailsComponent),
      },
      {
        path: 'criancas/nova',
        loadComponent: () =>
          import(
            './features/children/pages/child-form/child-form.component'
          ).then((m) => m.ChildFormComponent),
        data: { mode: 'create' },
      },
      {
        path: 'criancas/:id/editar',
        loadComponent: () =>
          import(
            './features/children/pages/child-form/child-form.component'
          ).then((m) => m.ChildFormComponent),
        data: { mode: 'edit' },
      },
      {
        path: 'criancas',
        loadComponent: () =>
          import(
            './features/children/pages/children-list/children-list.component'
          ).then((m) => m.ChildrenListComponent),
      },
      {
        path: 'criancas/:id',
        loadComponent: () =>
          import(
            './features/children/pages/child-details/child-details.component'
          ).then((m) => m.ChildDetailsComponent),
      },
    ],
  },
];
