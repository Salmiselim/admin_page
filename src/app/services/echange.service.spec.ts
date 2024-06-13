import { TestBed } from '@angular/core/testing';

import { EchangeService } from './echange.service';

describe('EchangeService', () => {
  let service: EchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
