import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  DocumentData,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { IngredientDocument, IngredientData } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private db;

  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.getApp());
  }

  async addIngredient(userId: string, ingredient: string): Promise<void> {
    const ref = doc(this.db, `ingredients/${userId}`);
    const data: IngredientDocument = {
      ingredientList: [ingredient],
      createdAt: new Date(),
      userId,
    };
    return setDoc(ref, data, { merge: true });
  }

  getIngredients(userId: string): Observable<string[]> {
    return from(
      getDocs(
        query(
          collection(this.db, 'ingredients'),
          where('userId', '==', userId),
        ),
      ),
    ).pipe(
      map((snapshot) =>
        snapshot.docs
          .map((doc) => doc.data() as IngredientData)
          .flatMap((data) => data.ingredientList || []),
      ),
    );
  }
  
  async submitFeedback(
    recipeId: string,
    liked: boolean,
    comments: string,
  ): Promise<void> {
    const feedbackCollection = collection(this.db, 'recipe_feedback');
    const feedback = {
      recipeId,
      userFeedback: {
        liked,
        comments,
      },
      createdAt: Timestamp.now(),
      generatedBy: 'Ollama',
    };

    await addDoc(feedbackCollection, feedback);
    console.log('Feedback successfully submitted!');
  }

  getPredefinedIngredients(): Observable<any[]> {
    const predefinedIngredientsRef = collection(
      this.db,
      'predefined_ingredients',
    );
    return from(
      getDocs(predefinedIngredientsRef).then((snapshot) =>
        snapshot.docs.map((doc) => doc.data()),
      ),
    );
  }

  getFilterOptions(filterType: string): Observable<any[]> {
    const filterRef = collection(this.db, 'filters');
    return from(
      getDocs(filterRef).then((snapshot) =>
        snapshot.docs
          .filter((doc) => doc.id === filterType)
          .map((doc) => doc.data()?.['options'] || []),
      ),
    );
  }
}
