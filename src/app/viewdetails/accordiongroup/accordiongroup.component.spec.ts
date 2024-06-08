import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordiongroupComponent } from './accordiongroup.component';

describe('AccordiongroupComponent', () => {
  let component: AccordiongroupComponent;
  let fixture: ComponentFixture<AccordiongroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccordiongroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordiongroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
