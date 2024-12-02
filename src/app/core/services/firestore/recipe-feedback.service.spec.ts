import { TestBed } from '@angular/core/testing';

import { RecipeFeedbackService } from './recipe-feedback.service';

describe('RecipeFeedbackService', () => {
  let service: RecipeFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
