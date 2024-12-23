import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHeaderMealMasterComponent } from './info-header-meal-master.component';

describe('InfoHeaderMealMasterComponent', () => {
  let component: InfoHeaderMealMasterComponent;
  let fixture: ComponentFixture<InfoHeaderMealMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoHeaderMealMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoHeaderMealMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
