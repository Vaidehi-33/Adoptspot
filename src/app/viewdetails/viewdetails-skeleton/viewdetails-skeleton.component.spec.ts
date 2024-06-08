import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdetailsSkeletonComponent } from './viewdetails-skeleton.component';

describe('ViewdetailsSkeletonComponent', () => {
  let component: ViewdetailsSkeletonComponent;
  let fixture: ComponentFixture<ViewdetailsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewdetailsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewdetailsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
