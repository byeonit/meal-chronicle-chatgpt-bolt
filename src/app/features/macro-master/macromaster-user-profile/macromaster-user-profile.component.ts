import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OllamaRecipeService } from '../../../core/services/ollama/ollama-recipe.service';
import { MacronutrientRecipe } from '../../../core/models/macronutrient-goals.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-macromaster-user-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './macromaster-user-profile.component.html',
  styleUrl: './macromaster-user-profile.component.css',
})
export class MacromasterUserProfileComponent {
  @Output() recipeDataEvent = new EventEmitter();
  @Output() loadingStatutEvent = new EventEmitter(); 

  private loading: Boolean = false;

  macronutrientRecipe: MacronutrientRecipe | undefined;

  macroProfileForm: FormGroup;
  userId: string = 'user_123'; // This can be dynamic if you have user authentication in place

  constructor(
    private fb: FormBuilder,
    private ollamaRecipeService: OllamaRecipeService,
  ) {
    // Initialize form with validation
    this.macroProfileForm = this.fb.group({
      proteinGoal: [null, [Validators.required, Validators.min(0)]],
      carbsGoal: [null, [Validators.required, Validators.min(0)]],
      fatsGoal: [null, [Validators.required, Validators.min(0)]],
      fitnessGoal: ['muscle_gaining', [Validators.required]], // Example: 'muscle_gaining', 'weight_loss', etc.
      targetCalories: [null, [Validators.required, Validators.min(1)]],
    });
  }

  // Method to save user goals to Firestore NOT usefull for now, Will havet move that on last piece of the UX when 
  // he received the recipe and validate that he is happysohe can save the goals and recipes to come back on it later
  // and also use previous Goals or define new Goals or update Current Goals
  /*saveUserGoals(): void {
    if (this.userProfileForm.valid) {
      const goals = this.userProfileForm.value;

      this.firestoreService.saveUserGoals(this.userId, goals)
        .then(() => {
          alert('Goals saved successfully!');
        })
        .catch((error) => {
          alert('Error saving goals: ' + error.message);
        });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }*/

  fetchMacronutrimentRecipeBasedOnGoals(): void {
    if (this.macroProfileForm.valid) {
      
      this.loading = true;
      this.loadingStatutEvent.emit(this.loading);

      this.ollamaRecipeService
        .generateMacronutrientsRecipe(this.macroProfileForm.value)
        .subscribe({
          next: (recipe) => {
            this.macronutrientRecipe = recipe; // Assuming Ollama returns a single recipe
          },
          error: (error) => {
            /*
            you suppose to inform the parent that the process failed
            but for the moment just deactivate the loadingg process
            */
            this.loading = false;
            this.loadingStatutEvent.emit(this.loading);
            console.error('Error generating recipe:', error);
          },
          complete: () => {
            this.loading = false;
            this.recipeDataEvent.emit(this.macronutrientRecipe);
            this.loadingStatutEvent.emit(this.loading);
          }
        });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

}
