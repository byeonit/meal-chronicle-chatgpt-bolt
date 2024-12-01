import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private db;

  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.getApp());
  }

  async saveRecipe(recipe: Partial<Recipe>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.db, 'recipes'), recipe);
      return docRef.id;
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw error;
    }
  }

  getUserRecipes(userId: string): Observable<Recipe[]> {
    return from(
      getDocs(
        query(
          collection(this.db, 'recipes'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        )
      ).then(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Recipe))
      )
    );
  }

  getRecentRecipes(): Observable<Recipe[]> {
    return from(
      getDocs(
        query(
          collection(this.db, 'recipes'),
          orderBy('createdAt', 'desc'),
          where('status', '==', 'generated')
        )
      ).then(snapshot =>
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Recipe))
      )
    );
  }
}