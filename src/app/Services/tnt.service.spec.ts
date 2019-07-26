import { TestBed, inject } from '@angular/core/testing';

import { TntService } from './tnt.service';

describe('TntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TntService]
    });
  });

  it('should be created', inject([TntService], (service: TntService) => {
    expect(service).toBeTruthy();
  }));
});
