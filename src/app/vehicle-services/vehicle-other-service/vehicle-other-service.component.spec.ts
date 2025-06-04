import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleOtherServiceComponent } from './vehicle-other-service.component';

describe('VehicleOtherServiceComponent', () => {
  let component: VehicleOtherServiceComponent;
  let fixture: ComponentFixture<VehicleOtherServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleOtherServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleOtherServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
