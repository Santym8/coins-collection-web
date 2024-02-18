import { TestBed } from '@angular/core/testing';

import { CoinService } from './coins.service';

describe('CoinsService', () => {
  let service: CoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
