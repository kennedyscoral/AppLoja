import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TamanhosPage } from './tamanhos.page';

const routes: Routes = [
  {
    path: '',
    component: TamanhosPage
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
export class TamanhosPageRoutingModule {}
