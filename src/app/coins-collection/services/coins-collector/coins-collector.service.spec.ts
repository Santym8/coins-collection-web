import { TestBed } from '@angular/core/testing';

import { CoinsCollectorService } from './coins-collector.service';

describe('CoinsCollectorService', () => {
  let service: CoinsCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinsCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
