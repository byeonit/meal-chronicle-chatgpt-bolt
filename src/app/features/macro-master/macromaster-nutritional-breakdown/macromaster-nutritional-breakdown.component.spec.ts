import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacromasterNutritionalBreakdownComponent } from './macromaster-nutritional-breakdown.component';

describe('MacromasterNutritionalBreakdownComponent', () => {
  let component: MacromasterNutritionalBreakdownComponent;
  let fixture: ComponentFixture<MacromasterNutritionalBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacromasterNutritionalBreakdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacromasterNutritionalBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
