import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OllamaRecipeRequest, OllamaRecipeResponse } from '../../models/ollama-recipe.model';
import { MacronutrientGoals } from '../../models/macronutrient-goals.model';

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

  generateAlternativeRecipe(payload: any): Observable<any> {
    const endpoint = `${this.ollamaApiUrl}/webhook/generate-alternative-recipe`; // Adjust endpoint path if necessary

    return this.http.post<OllamaRecipeResponse>(endpoint, payload).pipe(
      catchError(error => {
        console.error('Error generating recipe:', error);
        return throwError(() => new Error('Failed to generate recipe. Please try again.'));
      })
    );
  }

  generateCulinary(filters: any, mode: string): Observable<any> {
    const endpoint = `${this.ollamaApiUrl}/webhook/generate-culinary`; // Adjust endpoint path if necessary

    return this.http.post<any>(endpoint, {
      ...filters,
      mode: mode,
    });
  }

  /**
   * Send macronutrient goals to n8n to trigger Ollama and generate a recipe.
   * @param macronutrients - User's macronutrient goals to send to Ollama
   * @returns Observable of the generated recipe
   */
  generateMacronutrientsRecipe(macronutrients: MacronutrientGoals): Observable<any> {
    const endpoint = `${this.ollamaApiUrl}/webhook/generate-macronutrient-goals-recipe`; // Adjust endpoint path if necessary
    // Send the macronutrient data to the n8n workflow for processing

    return this.http.post<any>(endpoint, macronutrients).pipe(
      catchError(error => {
        console.error('Error generating MacronutrientGoals Recipe:', error);
        return throwError(() => new Error('Failed to generate MacronutrientGoals Recipe. Please try again.'));
      })
    );
  }

}