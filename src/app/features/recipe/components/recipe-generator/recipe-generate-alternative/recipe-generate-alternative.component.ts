import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListOfAlternativeOllamaRecipeResponse } from '../../../../../core/models/ollama-recipe.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-recipe-generate-alternative',
  standalone: true,
  imports: [CommonModule,MatDividerModule, MatTabsModule],
  templateUrl: './recipe-generate-alternative.component.html',
  styleUrl: './recipe-generate-alternative.component.css'
})
export class RecipeGenerateAlternativeComponent {
  @Input() recipes: ListOfAlternativeOllamaRecipeResponse | null = null;
}
