import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsWithoutLoginComponent } from './view-details-without-login.component';

describe('ViewDetailsWithoutLoginComponent', () => {
  let component: ViewDetailsWithoutLoginComponent;
  let fixture: ComponentFixture<ViewDetailsWithoutLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDetailsWithoutLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDetailsWithoutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
