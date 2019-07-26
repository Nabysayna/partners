import { TestBed, inject } from '@angular/core/testing';

import { SuperviseurService } from './superviseur.service';

describe('SuperviseurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperviseurService]
    });
  });

  it('should be created', inject([SuperviseurService], (service: SuperviseurService) => {
    expect(service).toBeTruthy();
  }));
});
