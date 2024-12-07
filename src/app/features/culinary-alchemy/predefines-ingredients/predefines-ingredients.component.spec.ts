import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinesIngredientsComponent } from './predefines-ingredients.component';

describe('PredefinesIngredientsComponent', () => {
  let component: PredefinesIngredientsComponent;
  let fixture: ComponentFixture<PredefinesIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredefinesIngredientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinesIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
