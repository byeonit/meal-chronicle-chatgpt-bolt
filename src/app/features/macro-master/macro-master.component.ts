import { Component } from '@angular/core';
import { MacromasterUserProfileComponent } from './macromaster-user-profile/macromaster-user-profile.component';
import { MacronutrientRecipe } from '../../core/models/macronutrient-goals.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MacromasterNutritionalBreakdownComponent } from './macromaster-nutritional-breakdown/macromaster-nutritional-breakdown.component';

@Component({
  selector: 'app-macro-master',
  standalone: true,
  imports: [
    CommonModule,
    MacromasterNutritionalBreakdownComponent,
    MacromasterUserProfileComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './macro-master.component.html',
  styleUrl: './macro-master.component.css'
})
export class MacroMasterComponent {
  loading: Boolean = false;
  macronutrientRecipe: MacronutrientRecipe | undefined;

  handleRecipe(data: any) {
    this.macronutrientRecipe = data;
  }

  handleLoadingStatut(data: any) {
    this.loading = data;
  }
}
