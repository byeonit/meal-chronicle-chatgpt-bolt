import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGenerateAlternativeComponent } from './recipe-generate-alternative.component';

describe('RecipeGenerateAlternativeComponent', () => {
  let component: RecipeGenerateAlternativeComponent;
  let fixture: ComponentFixture<RecipeGenerateAlternativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeGenerateAlternativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeGenerateAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
