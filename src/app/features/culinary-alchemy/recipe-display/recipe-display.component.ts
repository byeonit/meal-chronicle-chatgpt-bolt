import { Component,EventEmitter, Input, Output } from '@angular/core';
import { AlternativeOllamaRecipeResponse } from '../../../core/models/ollama-recipe.model';
import { CommonModule } from '@angular/common';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { Store } from '@ngrx/store';
import { toggleAnimation } from 'src/app/shared/animations';
import { SharedModule } from 'src/shared.module';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-display',
  standalone: true,
  imports: [
    CommonModule,
    IconModule,
    SharedModule,
    MatInputModule, 
    MatButtonModule, 
    MatButtonToggleModule,
    FormsModule

  ],
  templateUrl: './recipe-display.component.html',
  styleUrl: './recipe-display.component.css',
  animations: [toggleAnimation]
})
export class RecipeDisplayComponent {
  @Input() recipe: AlternativeOllamaRecipeResponse | null = null;
  @Input() recipeId: string = '';

  @Output() feedbackSubmitted = new EventEmitter<void>();

  rating: number = 0;
  comment: string = '';

  constructor( private firestoreService: FirestoreService) {  }


  submitFeedback(): void {
    if (this.rating > 0) {
      const feedback = {
        recipeId: this.recipeId,
        rating: this.rating,
        comment: this.comment,
        createdAt: new Date(),
      };

      this.firestoreService
        .submitFeedback("idRandom", true, feedback.comment)
        .then(() => {
          this.feedbackSubmitted.emit();
          alert('Feedback submitted successfully!');
        })
        .catch((error) => {
          console.error('Error submitting feedback:', error);
          alert('Error submitting feedback.');
        });
    } else {
      alert('Please provide a rating.');
    }
  }
}
