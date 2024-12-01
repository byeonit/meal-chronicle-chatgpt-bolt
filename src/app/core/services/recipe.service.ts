import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private db;
  private readonly apiUrl = environment.apiUrl;

  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.getApp());
  }

  async saveRecipe(recipe: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.db, 'recipes'), recipe);
      return docRef.id;
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw error;
    }
  }

  getRecipes(): Observable<any[]> {
    return from(
      getDocs(collection(this.db, 'recipes'))
        .then(snapshot => snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })))
    );
  }
}