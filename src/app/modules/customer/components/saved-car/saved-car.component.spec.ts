import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCarComponent } from './saved-car.component';

describe('SavedCarComponent', () => {
  let component: SavedCarComponent;
  let fixture: ComponentFixture<SavedCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
