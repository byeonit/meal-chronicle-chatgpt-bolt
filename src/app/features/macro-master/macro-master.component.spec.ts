import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroMasterComponent } from './macro-master.component';

describe('MacroMasterComponent', () => {
  let component: MacroMasterComponent;
  let fixture: ComponentFixture<MacroMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacroMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacroMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
