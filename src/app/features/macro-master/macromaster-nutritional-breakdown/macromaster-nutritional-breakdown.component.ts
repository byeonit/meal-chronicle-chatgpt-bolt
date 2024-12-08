import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MacronutrientRecipe } from '../../../core/models/macronutrient-goals.model';

@Component({
  selector: 'app-macromaster-nutritional-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './macromaster-nutritional-breakdown.component.html',
  styleUrl: './macromaster-nutritional-breakdown.component.css'
})
export class MacromasterNutritionalBreakdownComponent {
  @Input() recipe: MacronutrientRecipe | undefined; // Will receive macronutrient goals from the parent
}
