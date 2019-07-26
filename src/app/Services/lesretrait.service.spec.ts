import { TestBed, inject } from '@angular/core/testing';

import { LesretraitService } from './lesretrait.service';

describe('LesretraitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LesretraitService]
    });
  });

  it('should be created', inject([LesretraitService], (service: LesretraitService) => {
    expect(service).toBeTruthy();
  }));
});
