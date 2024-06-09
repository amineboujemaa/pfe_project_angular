import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarDetailsComponent } from './view-car-details.component';

describe('ViewCarDetailsComponent', () => {
  let component: ViewCarDetailsComponent;
  let fixture: ComponentFixture<ViewCarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCarDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
