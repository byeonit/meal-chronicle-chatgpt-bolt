import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacromasterUserProfileComponent } from './macromaster-user-profile.component';

describe('MacromasterUserProfileComponent', () => {
  let component: MacromasterUserProfileComponent;
  let fixture: ComponentFixture<MacromasterUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacromasterUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacromasterUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
