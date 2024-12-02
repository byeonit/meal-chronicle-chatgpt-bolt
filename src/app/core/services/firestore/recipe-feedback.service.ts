import { Injectable } from '@angular/core';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where,
  DocumentData 
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeFeedbackService {
  private db;

  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.getApp());
  }

  // Add feedback to the Firestore
  addFeedback(recipeId: string, feedback: { rating: number; comment?: string }) {
    //const feedbackRef = collection(this.firestore, `recipes/${recipeId}/feedback`);+
    const feedbackRef = doc(this.db, `recipes/${recipeId}/feedback`);

    return addDoc(feedbackRef, {
      ...feedback,
      createdAt: new Date(), // Updated field name for coherence
    });
  }

  async addFeedback(recipeId: string, feedback: { rating: number; comment?: string }) {
    const feedbackRef = doc(this.db, `recipes/${recipeId}/feedback`);
    const data: IngredientDocument = {
      ingredientList: [ingredient],
      createdAt: new Date(),
      userId
    };
    return setDoc(ref, data, { merge: true });
  }

  // Fetch all feedback for a recipe
  getFeedback(recipeId: string): Observable<any[]> {
    const feedbackRef = collection(this.firestore, `recipes/${recipeId}/feedback`);
    return collectionData(feedbackRef, { idField: 'id' });
  }
}
