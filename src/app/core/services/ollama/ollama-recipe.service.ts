import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OllamaRecipeRequest, OllamaRecipeResponse } from '../../models/ollama-recipe.model';

@Injectable({
  providedIn: 'root'
})
export class OllamaRecipeService {
  private ollamaApiUrl = 'http://192.168.1.4:5678'; // Use the correct IP and port for Docker

  constructor(private http: HttpClient) {}

  generateRecipe(payload: any): Observable<any> {
    const endpoint = `${this.ollamaApiUrl}/webhook/generate-recipe`; // Adjust endpoint path if necessary

    return this.http.post<OllamaRecipeResponse>(endpoint, payload).pipe(
      catchError(error => {
        console.error('Error generating recipe:', error);
        return throwError(() => new Error('Failed to generate recipe. Please try again.'));
      })
    );

  }

}
