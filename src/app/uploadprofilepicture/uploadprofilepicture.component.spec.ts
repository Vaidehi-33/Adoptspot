import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadprofilepictureComponent } from './uploadprofilepicture.component';

describe('UploadprofilepictureComponent', () => {
  let component: UploadprofilepictureComponent;
  let fixture: ComponentFixture<UploadprofilepictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadprofilepictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadprofilepictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
