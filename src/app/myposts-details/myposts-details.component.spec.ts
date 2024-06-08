import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostsDetailsComponent } from './myposts-details.component';

describe('MypostsDetailsComponent', () => {
  let component: MypostsDetailsComponent;
  let fixture: ComponentFixture<MypostsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MypostsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MypostsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
