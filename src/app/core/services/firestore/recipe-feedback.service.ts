import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeFeedbackService {
  constructor(private firestore: Firestore) {}

  // Add feedback to the Firestore
  addFeedback(recipeId: string, feedback: { rating: number; comment?: string }) {
    const feedbackRef = collection(this.firestore, `recipes/${recipeId}/feedback`);
    return addDoc(feedbackRef, {
      ...feedback,
      createdAt: new Date(), // Updated field name for coherence
    });
  }

  // Fetch all feedback for a recipe
  getFeedback(recipeId: string): Observable<any[]> {
    const feedbackRef = collection(this.firestore, `recipes/${recipeId}/feedback`);
    return collectionData(feedbackRef, { idField: 'id' });
  }
}
