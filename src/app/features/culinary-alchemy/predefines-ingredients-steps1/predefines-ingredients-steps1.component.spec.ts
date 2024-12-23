import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinesIngredientsSteps1Component } from './predefines-ingredients-steps1.component';

describe('PredefinesIngredientsSteps1Component', () => {
  let component: PredefinesIngredientsSteps1Component;
  let fixture: ComponentFixture<PredefinesIngredientsSteps1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredefinesIngredientsSteps1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinesIngredientsSteps1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
