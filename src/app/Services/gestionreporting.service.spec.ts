import { TestBed, inject } from '@angular/core/testing';

import { GestionreportingService } from './gestionreporting.service';

describe('GestionreportingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionreportingService]
    });
  });

  it('should be created', inject([GestionreportingService], (service: GestionreportingService) => {
    expect(service).toBeTruthy();
  }));
});
