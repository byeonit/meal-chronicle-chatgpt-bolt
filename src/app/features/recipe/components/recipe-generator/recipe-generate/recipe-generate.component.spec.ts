import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGenerateComponent } from './recipe-generate.component';

describe('RecipeGenerateComponent', () => {
  let component: RecipeGenerateComponent;
  let fixture: ComponentFixture<RecipeGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeGenerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
