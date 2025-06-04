import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalPermitComponent } from './national-permit.component';

describe('NationalPermitComponent', () => {
  let component: NationalPermitComponent;
  let fixture: ComponentFixture<NationalPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationalPermitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
