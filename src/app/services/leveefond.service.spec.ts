import { TestBed } from '@angular/core/testing';

import { LeveefondService } from './leveefond.service';

describe('LeveefondService', () => {
  let service: LeveefondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeveefondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
