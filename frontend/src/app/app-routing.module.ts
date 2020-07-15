import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'roupas',
    loadChildren: () => import('./roupas/roupas.module').then( m => m.RoupasPageModule)
  },
  {
    path: 'marcas',
    loadChildren: () => import('./marcas/marcas.module').then( m => m.MarcasPageModule)
  },
  {
    path: 'tamanhos',
    loadChildren: () => import('./tamanhos/tamanhos.module').then( m => m.TamanhosPageModule)
  },
  {
    path: 'generos',
    loadChildren: () => import('./generos/generos.module').then( m => m.GenerosPageModule)
  },
  {
    path: 'cores',
    loadChildren: () => import('./cores/cores.module').then( m => m.CoresPageModule)
  }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
