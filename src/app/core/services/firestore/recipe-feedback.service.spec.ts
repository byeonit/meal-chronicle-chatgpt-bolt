import { TestBed } from '@angular/core/testing';
import { RecipeFeedbackService } from './recipe-feedback.service';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc, collectionData } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('RecipeFeedbackService', () => {
  let service: RecipeFeedbackService;

  // Mock Firestore functions
  const mockFirestore = {
    collection: jasmine.createSpy('collection').and.returnValue({}),
    addDoc: jasmine.createSpy('addDoc').and.returnValue(Promise.resolve({})),
    collectionData: jasmine.createSpy('collectionData').and.returnValue(of([])),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeFeedbackService,
        { provide: Firestore, useValue: mockFirestore }, // Provide mock Firestore
      ],
    });

    service = TestBed.inject(RecipeFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add feedback to the correct Firestore collection', async () => {
    const recipeId = 'test-recipe-id';
    const feedback = { rating: 5, comment: 'Great recipe!' };

    await service.addFeedback(recipeId, feedback);

    expect(mockFirestore.collection).toHaveBeenCalledWith(
      jasmine.any(Object), 
      `recipes/${recipeId}/feedback`
    );
    expect(mockFirestore.addDoc).toHaveBeenCalledWith(
      jasmine.any(Object), 
      { ...feedback, createdAt: jasmine.any(Date) }
    );
  });

  it('should fetch feedback for a specific recipe', () => {
    const recipeId = 'test-recipe-id';
    const mockFeedback = [
      { rating: 5, comment: 'Loved it!', createdAt: new Date() },
      { rating: 3, comment: 'It was okay.', createdAt: new Date() },
    ];

    mockFirestore.collectionData.and.returnValue(of(mockFeedback));

    service.getFeedback(recipeId).subscribe((data) => {
      expect(data).toEqual(mockFeedback);
    });

    expect(mockFirestore.collection).toHaveBeenCalledWith(
      jasmine.any(Object), 
      `recipes/${recipeId}/feedback`
    );
    expect(mockFirestore.collectionData).toHaveBeenCalledWith(
      jasmine.any(Object),
      { idField: 'id' }
    );
  });
});
