import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicesPageRoutingModule } from './polices-routing.module';

import { PolicesPage } from './polices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicesPageRoutingModule
  ],
  declarations: [PolicesPage]
})
export class PolicesPageModule {}
