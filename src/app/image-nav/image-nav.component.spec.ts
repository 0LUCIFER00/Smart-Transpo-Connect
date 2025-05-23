import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageNavComponent } from './image-nav.component';

describe('ImageNavComponent', () => {
  let component: ImageNavComponent;
  let fixture: ComponentFixture<ImageNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
