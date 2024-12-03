import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OllamaRecipeRequest, OllamaRecipeResponse } from '../../models/ollama-recipe.model';

@Injectable({
  providedIn: 'root'
})
export class OllamaRecipeService {
  private readonly apiUrl = '/api/ollama-generate-recipe';

  constructor(private http: HttpClient) {}

  generateRecipe(request: OllamaRecipeRequest): Observable<OllamaRecipeResponse> {
    return this.http.post<OllamaRecipeResponse>(this.apiUrl, request).pipe(
      catchError(error => {
        console.error('Error generating recipe:', error);
        return throwError(() => new Error('Failed to generate recipe. Please try again.'));
      })
    );
  }
}