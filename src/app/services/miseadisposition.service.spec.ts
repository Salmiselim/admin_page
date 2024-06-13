import { TestBed } from '@angular/core/testing';

import { MiseadispositionService } from './miseadisposition.service';

describe('MiseadispositionService', () => {
  let service: MiseadispositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiseadispositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
