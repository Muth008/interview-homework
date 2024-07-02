import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'products',
        loadComponent: () => import('./pages/items-list/items-list.component').then(m => m.ItemsListComponent)
      },
      {
        path: 'shipments',
        loadComponent: () => import('./pages/shipments-list/shipments-list.component').then(m => m.ShipmentsListComponent)
      },
      {
        path: '',
        redirectTo: 'shipments',
        pathMatch: 'full'
      },
      {
        path: '**',
        loadComponent: () => import('./core/not-found/not-found.component').then(m => m.NotFoundComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
