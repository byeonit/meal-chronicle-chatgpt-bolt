import { Component } from '@angular/core';
import { MealmasterUserProfileComponent } from './mealmaster-user-profile/mealmaster-user-profile.component';
import { OllamaRecipeService } from '../../core/services/ollama/ollama-recipe.service';
import { MealPlanRequest } from '../../core/models/mealplan.model';
import { MealPlanDisplayComponent } from "./meal-plan-display/meal-plan-display.component";
import { CommonModule } from '@angular/common';
import { InfoHeaderMealMasterComponent } from "./info-header-meal-master/info-header-meal-master.component";

@Component({
  selector: 'app-meal-master',
  standalone: true,
  imports: [CommonModule, MealmasterUserProfileComponent, MealPlanDisplayComponent, InfoHeaderMealMasterComponent],
  templateUrl: './meal-master.component.html',
  styleUrl: './meal-master.component.css'
})
export class MealMasterComponent {
  mealPlan: any[] = [];
  errorMessage: string = '';

  constructor(private ollamaRecipeService: OllamaRecipeService) {}

  handleFormSubmit(request: MealPlanRequest): void {
    this.errorMessage = '';
    this.ollamaRecipeService.generateMealPlan(request).subscribe({
      next: (response) => {
        this.mealPlan = response.mealPlan;
      },
      error: (error) => {
        console.error('Error generating meal plan:', error);
        this.errorMessage = 'Failed to generate meal plan. Please try again.';
      }
    });
  }
}
