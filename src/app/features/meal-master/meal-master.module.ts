import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealMasterRoutingModule } from './meal-master-routing.module';
import { InfoHeaderMealMasterComponent } from './info-header-meal-master/info-header-meal-master.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MealMasterRoutingModule,
    InfoHeaderMealMasterComponent
  ]
})
export class MealMasterModule { }
