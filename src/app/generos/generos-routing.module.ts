import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerosPage } from './generos.page';

const routes: Routes = [
  {
    path: '',
    component: GenerosPage
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'cadastro/:id',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerosPageRoutingModule {}
