import { TestBed } from '@angular/core/testing';
import { AiPromptService } from './ai-prompt.service';

describe('AiPromptService', () => {
  let service: AiPromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiPromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a valid prompt with ingredients, meal type, and skill level', () => {
    const ingredients = ['tomato', 'basil', 'mozzarella'];
    const mealType = 'lunch';
    const skillLevel = 'intermediate';

    const prompt = service.generatePrompt(ingredients, mealType, skillLevel);

    expect(prompt).toBe(
      'Create a recipe for a lunch using the following ingredients: tomato, basil, mozzarella. Skill level required: intermediate.'
    );
  });

  it('should handle an empty ingredients array gracefully', () => {
    const ingredients: string[] = [];
    const mealType = 'dinner';
    const skillLevel = 'beginner';

    const prompt = service.generatePrompt(ingredients, mealType, skillLevel);

    expect(prompt).toBe(
      'Create a recipe for a dinner using the following ingredients: . Skill level required: beginner.'
    );
  });

  it('should generate prompt with only the specified skill level if no meal type is provided', () => {
    const ingredients = ['chicken'];
    const mealType = '';
    const skillLevel = 'expert';

    const prompt = service.generatePrompt(ingredients, mealType, skillLevel);

    expect(prompt).toBe(
      'Create a recipe for a  using the following ingredients: chicken. Skill level required: expert.'
    );
  });
});
