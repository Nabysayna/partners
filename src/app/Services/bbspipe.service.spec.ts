import { TestBed, inject } from '@angular/core/testing';

import { BbspipeService } from './bbspipe.service';

describe('BbspipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BbspipeService]
    });
  });

  it('should be created', inject([BbspipeService], (service: BbspipeService) => {
    expect(service).toBeTruthy();
  }));
});
