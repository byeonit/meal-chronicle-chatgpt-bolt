import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MacroMasterRoutingModule } from './macro-master-routing.module';
import { MacroMasterComponent } from './macro-master.component';
import { InfoHeaderMacroMasterComponent } from './info-header-macro-master/info-header-macro-master.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MacroMasterRoutingModule,
    MacroMasterComponent,
    InfoHeaderMacroMasterComponent
  ]
})
export class MacroMasterModule { }
