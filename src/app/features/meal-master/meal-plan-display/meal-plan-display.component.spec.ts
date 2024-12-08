import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanDisplayComponent } from './meal-plan-display.component';

describe('MealPlanDisplayComponent', () => {
  let component: MealPlanDisplayComponent;
  let fixture: ComponentFixture<MealPlanDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlanDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealPlanDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
