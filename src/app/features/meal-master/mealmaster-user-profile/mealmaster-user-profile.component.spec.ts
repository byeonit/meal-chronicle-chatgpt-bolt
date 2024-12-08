import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealmasterUserProfileComponent } from './mealmaster-user-profile.component';

describe('MealmasterUserProfileComponent', () => {
  let component: MealmasterUserProfileComponent;
  let fixture: ComponentFixture<MealmasterUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealmasterUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealmasterUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
