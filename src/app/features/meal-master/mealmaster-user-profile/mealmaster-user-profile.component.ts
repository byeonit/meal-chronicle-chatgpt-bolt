import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MealPlanRequest } from '../../../core/models/mealplan.model';
import { OllamaRecipeService } from '../../../core/services/ollama/ollama-recipe.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mealmaster-user-profile',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, MatButtonModule,MatSelectModule,MatFormFieldModule,MatInputModule],
  templateUrl: './mealmaster-user-profile.component.html',
  styleUrl: './mealmaster-user-profile.component.css'
})
export class MealmasterUserProfileComponent {
  @Output() formSubmit = new EventEmitter<MealPlanRequest>();

  // Form values
  durationDays: number = 7;
  dietaryPreferences: string[] = [];
  macronutrientGoals = { protein: 150, carbs: 200, fats: 70, calories: 2500 };
  fitnessGoal: string = 'Muscle Gain';

  submitForm(): void {
    const request: MealPlanRequest = {
      durationDays: this.durationDays,
      dietaryPreferences: this.dietaryPreferences,
      macronutrientGoals: this.macronutrientGoals,
      fitnessGoal: this.fitnessGoal,
    };

    this.formSubmit.emit(request);
  }
}