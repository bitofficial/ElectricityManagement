import { TestBed } from '@angular/core/testing';

import { BillHistoryService } from './bill-history.service';

describe('BillHistoryService', () => {
  let service: BillHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
