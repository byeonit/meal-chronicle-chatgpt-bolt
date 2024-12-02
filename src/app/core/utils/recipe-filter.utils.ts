import { Recipe } from '../models/recipe.model';

export function filterRecipesByIngredients(
  recipes: Recipe[],
  ingredients: string[]
): Recipe[] {
  if (!ingredients?.length) return recipes;

  return recipes.filter((recipe) =>
    ingredients.every((ingredient) =>
      recipe.ingredients.some((recipeIngredient) =>
        recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    )
  );
}

export function filterRecipesByTools(
  recipes: Recipe[],
  tools: string[] = []
): Recipe[] {
  if (!tools?.length) return recipes;

  return recipes.filter((recipe) =>
    tools.every((tool) => recipe.tools?.includes(tool))
  );
}

export function filterRecipesByTime(
  recipes: Recipe[],
  maxTime?: number
): Recipe[] {
  if (!maxTime) return recipes;

  return recipes.filter((recipe) => recipe.time <= maxTime);
}

export function filterRecipesBySkillLevel(
  recipes: Recipe[],
  skillLevel?: string[] | null
): Recipe[] {
  if (!skillLevel?.length) return recipes;

  const skillLevels = ['beginner', 'intermediate', 'expert'];

  return recipes.filter((recipe) => {
    if (!recipe.skillLevel?.length) return false;
    
    return recipe.skillLevel.some((level) => {
      if (!level) return false;
      const levelIndex = skillLevels.indexOf(level.toLowerCase());
      return skillLevel.some(userLevel => {
        const userLevelIndex = skillLevels.indexOf(userLevel.toLowerCase());
        return levelIndex <= userLevelIndex;
      });
    });
  });
}