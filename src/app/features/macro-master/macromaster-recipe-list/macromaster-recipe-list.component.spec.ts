import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacromasterRecipeListComponent } from './macromaster-recipe-list.component';

describe('MacromasterRecipeListComponent', () => {
  let component: MacromasterRecipeListComponent;
  let fixture: ComponentFixture<MacromasterRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacromasterRecipeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacromasterRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
