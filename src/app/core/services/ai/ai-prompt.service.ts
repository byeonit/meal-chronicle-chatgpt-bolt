import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiPromptService {

  constructor() { }

  // Method to generate the AI prompt based on user ingredients
  generatePrompt(ingredients: string[], mealType: string, skillLevel: string): string {
    const ingredientList = ingredients.join(', ');
    return `Create a recipe for a ${mealType} using the following ingredients: ${ingredientList}. Skill level required: ${skillLevel}.`;
  }
  
}