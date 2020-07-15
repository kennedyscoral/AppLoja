import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TamanhosPageRoutingModule } from './tamanhos-routing.module';

import { TamanhosPage } from './tamanhos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TamanhosPageRoutingModule
  ],
  declarations: [TamanhosPage]
})
export class TamanhosPageModule {}
