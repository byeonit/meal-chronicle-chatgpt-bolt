import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OllamaRecipeRequest, OllamaRecipeResponse } from '../../models/ollama-recipe.model';

@Injectable({
  providedIn: 'root'
})
export class OllamaRecipeService {
  /*
  private readonly apiUrl = '/api/ollama-generate-recipe';

  constructor(private http: HttpClient) {}

  generateRecipe(request: OllamaRecipeRequest): Observable<OllamaRecipeResponse> {
    return this.http.post<OllamaRecipeResponse>(this.apiUrl, request).pipe(
      catchError(error => {
        console.error('Error generating recipe:', error);
        return throwError(() => new Error('Failed to generate recipe. Please try again.'));
      })
    );
  }*/

  private ollamaApiUrl = 'http://192.168.1.4:5678'; // Use the correct IP and port for Docker
  
  constructor(private http: HttpClient) {}

  generateRecipe(payload: any): Observable<any> {
    console.log("generateRecipe value to send " + payload);
    console.log("generateRecipe value to send  JSON.stringify(payload)" + JSON.stringify(payload));
    //const endpoint = `${this.ollamaApiUrl}/api/generate-recipe`; // Adjust endpoint path if necessary
    const endpoint = `${this.ollamaApiUrl}/webhook/generate-recipe`; // Adjust endpoint path if necessary
    return this.http.post(endpoint, payload);
    //return this.http.get(endpoint);
  }
}
