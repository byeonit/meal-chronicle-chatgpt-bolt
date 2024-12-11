import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../../../core/services/firestore.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-culinary-feedback',
  standalone: true,
  imports: [
    MatInputModule, 
    MatButtonModule, 
    MatButtonToggleModule,
    FormsModule
  ],
  templateUrl: './culinary-feedback.component.html',
  styleUrl: './culinary-feedback.component.css',
})
export class CulinaryFeedbackComponent {
  @Input() recipeId: string = '';
  @Output() feedbackSubmitted = new EventEmitter<void>();

  rating: number = 0;
  comment: string = '';

  constructor(private firestoreService: FirestoreService) {}

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
