import { TestBed } from '@angular/core/testing';

import { AppelfondService } from './appelfond.service';

describe('AppelfondService', () => {
  let service: AppelfondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppelfondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
