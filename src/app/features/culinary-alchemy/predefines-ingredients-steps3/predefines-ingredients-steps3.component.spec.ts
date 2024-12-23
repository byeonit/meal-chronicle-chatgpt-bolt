import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinesIngredientsSteps3Component } from './predefines-ingredients-steps3.component';

describe('PredefinesIngredientsSteps3Component', () => {
  let component: PredefinesIngredientsSteps3Component;
  let fixture: ComponentFixture<PredefinesIngredientsSteps3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredefinesIngredientsSteps3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinesIngredientsSteps3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
