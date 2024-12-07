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

  /**
   * Fetch recipes from Firestore based on macronutrient goals.
   * @param macronutrients - User's macronutrient goals (protein, carbs, fats, etc.)
   * @returns Observable of recipes
   */
  getRecipesForMacros(macronutrients: any): Observable<any> {
    const recipesRef = collection(this.db, 'macronutrient_recipes'); // Updated to macronutrient_recipes collection

    // Create a query to filter recipes based on macronutrient goals
    let recipesQuery = query(recipesRef);

    if (macronutrients.protein) {
      recipesQuery = query(
        recipesRef,
        where('proteinGoal', '>=', macronutrients.protein),
      );
    }
    if (macronutrients.carbs) {
      recipesQuery = query(
        recipesRef,
        where('carbsGoal', '>=', macronutrients.carbs),
      );
    }
    if (macronutrients.fats) {
      recipesQuery = query(
        recipesRef,
        where('fatsGoal', '>=', macronutrients.fats),
      );
    }

    // Fetch recipes from Firestore
    return new Observable((observer) => {
      getDocs(recipesQuery)
        .then((querySnapshot) => {
          const recipes: any[] = [];
          querySnapshot.forEach((doc) => {
            recipes.push(doc.data());
          });
          observer.next(recipes); // Send the recipes back to the component
          observer.complete();
        })
        .catch((error) => {
          observer.error('Error fetching recipes from Firestore: ' + error);
        });
    });
  }

  /**
   * Save user's macronutrient goals to Firestore.
   * @param goals - User's macronutrient goals to store
   * @returns Observable
   */
  async saveUserGoals(userId: string, goals: any): Promise<void> {
    const goalsRef = doc(this.db, 'user_goals', userId); // Unique document for each user
    try {
      // Save the user's goals in Firestore (using merge to avoid overwriting other data)
      await setDoc(goalsRef, goals, { merge: true });
      console.log('User goals saved successfully!');
    } catch (error) {
      console.error('Error saving user goals to Firestore:', error);
      throw new Error('Failed to save user goals');
    }
  }
}
