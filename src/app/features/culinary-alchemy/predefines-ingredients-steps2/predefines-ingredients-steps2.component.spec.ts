import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinesIngredientsSteps2Component } from './predefines-ingredients-steps2.component';

describe('PredefinesIngredientsSteps2Component', () => {
  let component: PredefinesIngredientsSteps2Component;
  let fixture: ComponentFixture<PredefinesIngredientsSteps2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredefinesIngredientsSteps2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinesIngredientsSteps2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
