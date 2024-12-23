import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHeaderCulinaryAlchemyComponent } from './info-header-culinary-alchemy.component';

describe('InfoHeaderCulinaryAlchemyComponent', () => {
  let component: InfoHeaderCulinaryAlchemyComponent;
  let fixture: ComponentFixture<InfoHeaderCulinaryAlchemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoHeaderCulinaryAlchemyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoHeaderCulinaryAlchemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
