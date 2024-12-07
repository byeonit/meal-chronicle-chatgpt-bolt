import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AlternativeOllamaRecipeResponse } from '../../../../../core/models/ollama-recipe.model';
import { FirestoreService } from '../../../../../core/services/firestore.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recipe-feedback',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './recipe-feedback.component.html',
  styleUrl: './recipe-feedback.component.css'
})
export class RecipeFeedbackComponent {
  
  @Input() recipe: AlternativeOllamaRecipeResponse | null = null;
  
  favoriteControl = new FormControl(true);
  
  fontStyleControl = new FormControl('');
  fontStyle?: string;

  feedback = {
    liked: false,
    comments: '',
  };
  
  constructor(private firestoreService: FirestoreService) {}

  submitFeedback(): void {
    if (this.recipe) {
      this.recipe.output.id = 'feedBackNumber1';

      this.feedback.liked = this.favoriteControl.value == null ? true : this.favoriteControl.value;

      this.firestoreService
        .submitFeedback(
          this.recipe.output.id,
          this.feedback.liked,
          this.feedback.comments,
        )
        .then(() => {
          console.log('Feedback submitted!');
          this.feedback = { liked: true, comments: '' }; // Reset feedback form
        })
        .catch((error) => {
          console.error('Error submitting feedback:', error);
        });
    } else {
      console.error('No recipe available for feedback.');
    }
  }

}
