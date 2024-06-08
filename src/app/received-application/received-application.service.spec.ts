import { TestBed } from '@angular/core/testing';

import { ReceivedApplicationService } from './received-application.service';

describe('ReceivedApplicationService', () => {
  let service: ReceivedApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivedApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
