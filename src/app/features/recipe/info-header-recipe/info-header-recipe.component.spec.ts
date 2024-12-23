import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHeaderRecipeComponent } from './info-header-recipe.component';

describe('InfoHeaderRecipeComponent', () => {
  let component: InfoHeaderRecipeComponent;
  let fixture: ComponentFixture<InfoHeaderRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoHeaderRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoHeaderRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
