import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulinaryFeedbackComponent } from './culinary-feedback.component';

describe('CulinaryFeedbackComponent', () => {
  let component: CulinaryFeedbackComponent;
  let fixture: ComponentFixture<CulinaryFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CulinaryFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulinaryFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
