import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHeaderMacroMasterComponent } from './info-header-macro-master.component';

describe('InfoHeaderMacroMasterComponent', () => {
  let component: InfoHeaderMacroMasterComponent;
  let fixture: ComponentFixture<InfoHeaderMacroMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoHeaderMacroMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoHeaderMacroMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
