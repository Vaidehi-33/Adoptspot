import { TestBed } from '@angular/core/testing';

import { ViewdetailsService } from './viewdetails.service';

describe('ViewdetailsService', () => {
  let service: ViewdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
