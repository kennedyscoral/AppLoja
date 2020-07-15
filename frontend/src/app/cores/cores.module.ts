import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoresPageRoutingModule } from './cores-routing.module';

import { CoresPage } from './cores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoresPageRoutingModule
  ],
  declarations: [CoresPage]
})
export class CoresPageModule {}
