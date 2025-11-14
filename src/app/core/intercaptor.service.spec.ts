import { TestBed } from '@angular/core/testing';

import { IntercaptorService } from './intercaptor.service';

describe('IntercaptorService', () => {
  let service: IntercaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntercaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
