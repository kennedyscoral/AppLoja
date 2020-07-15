import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoupasPageRoutingModule } from './roupas-routing.module';

import { RoupasPage } from './roupas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoupasPageRoutingModule
  ],
  declarations: [RoupasPage]
})
export class RoupasPageModule {}
