import { TestBed } from '@angular/core/testing';
import { RecipeFeedbackService } from './recipe-feedback.service';
import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('RecipeFeedbackService', () => {
  let service: RecipeFeedbackService;
  let mockAddDoc: jasmine.Spy;
  let mockCollection: jasmine.Spy;
  let mockCollectionData: jasmine.Spy;

  beforeEach(() => {
    mockAddDoc = jasmine.createSpy('addDoc').and.returnValue(Promise.resolve());
    mockCollection = jasmine.createSpy('collection').and.callFake((firestore, path) => ({ firestore, path }));
    mockCollectionData = jasmine.createSpy('collectionData').and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [
        RecipeFeedbackService,
        {
          provide: Firestore,
          useValue: {}, // Firestore itself doesn't have functions, it's just a placeholder
        },
        { provide: collection, useValue: mockCollection },
        { provide: addDoc, useValue: mockAddDoc },
        { provide: collectionData, useValue: mockCollectionData },
      ],
    });

    service = TestBed.inject(RecipeFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should add feedback to the correct Firestore collection', async () => {
    const recipeId = 'test-recipe-id';
    const feedback = { rating: 5, comment: 'Great recipe!' };

    await service.addFeedback(recipeId, feedback);

    expect(mockCollection).toHaveBeenCalledWith(jasmine.any(Object), `recipes/${recipeId}/feedback`);
    expect(mockAddDoc).toHaveBeenCalledWith(jasmine.any(Object), {
      ...feedback,
      createdAt: jasmine.any(Date),
    });
  });

  xit('should fetch feedback for a specific recipe', () => {
    const recipeId = 'test-recipe-id';
    const mockFeedback = [
      { rating: 5, comment: 'Loved it!', createdAt: new Date() },
      { rating: 3, comment: 'It was okay.', createdAt: new Date() },
    ];

    mockCollectionData.and.returnValue(of(mockFeedback));

    service.getFeedback(recipeId).subscribe((data) => {
      expect(data).toEqual(mockFeedback);
    });

    expect(mockCollection).toHaveBeenCalledWith(jasmine.any(Object), `recipes/${recipeId}/feedback`);
    expect(mockCollectionData).toHaveBeenCalledWith(jasmine.any(Object), { idField: 'id' });
  });
});
