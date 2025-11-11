import { TestBed } from '@angular/core/testing';

import { ManageConnectionService } from './manage-connection.service';

describe('ManageConnectionService', () => {
  let service: ManageConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
