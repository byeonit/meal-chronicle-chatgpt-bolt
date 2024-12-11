import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealMasterComponent } from './meal-master.component';

describe('MealMasterComponent', () => {
  let component: MealMasterComponent;
  let fixture: ComponentFixture<MealMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
