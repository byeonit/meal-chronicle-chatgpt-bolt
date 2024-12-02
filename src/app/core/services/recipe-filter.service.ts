import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeFilters } from '../models/recipe-filters.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeFilterService {
  applyFilters(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
    let filteredRecipes = [...recipes];

    if (filters.skillLevel?.length) {
      filteredRecipes = this.filterBySkillLevel(filteredRecipes, filters.skillLevel);
    }

    if (filters.maxTime) {
      filteredRecipes = this.filterByTime(filteredRecipes, filters.maxTime);
    }

    if (filters.tools?.length) {
      filteredRecipes = this.filterByTools(filteredRecipes, filters.tools);
    }

    return filteredRecipes;
  }

  private filterBySkillLevel(recipes: Recipe[], skillLevels: string[]): Recipe[] {
    return recipes.filter((recipe) => {
      return recipe.skillLevel.some((level) => 
        skillLevels.includes(level)
      );
    });
  }

  private filterByTime(recipes: Recipe[], maxTime: number): Recipe[] {
    return recipes.filter((recipe) => recipe.time <= maxTime);
  }

  private filterByTools(recipes: Recipe[], tools: string[]): Recipe[] {
    return recipes.filter((recipe) => 
      tools.every((tool) => recipe.tools.includes(tool))
    );
  }
}