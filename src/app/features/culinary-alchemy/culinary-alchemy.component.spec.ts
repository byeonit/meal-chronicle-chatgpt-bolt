import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulinaryAlchemyComponent } from './culinary-alchemy.component';

describe('CulinaryAlchemyComponent', () => {
  let component: CulinaryAlchemyComponent;
  let fixture: ComponentFixture<CulinaryAlchemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CulinaryAlchemyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulinaryAlchemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
