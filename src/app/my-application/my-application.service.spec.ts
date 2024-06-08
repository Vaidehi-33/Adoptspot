import { TestBed } from '@angular/core/testing';

import { MyApplicationService } from './my-application.service';

describe('MyApplicationService', () => {
  let service: MyApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
