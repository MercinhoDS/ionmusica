import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicesPage } from './polices.page';

const routes: Routes = [
  {
    path: '',
    component: PolicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicesPageRoutingModule {}
