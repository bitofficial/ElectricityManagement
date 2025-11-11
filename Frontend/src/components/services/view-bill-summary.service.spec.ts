import { TestBed } from '@angular/core/testing';

import { ViewBillSummaryService } from './view-bill-summary.service';

describe('ViewBillSummaryService', () => {
  let service: ViewBillSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewBillSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
