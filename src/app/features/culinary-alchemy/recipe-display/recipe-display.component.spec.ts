import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDisplayComponent } from './recipe-display.component';

describe('RecipeDisplayComponent', () => {
  let component: RecipeDisplayComponent;
  let fixture: ComponentFixture<RecipeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
