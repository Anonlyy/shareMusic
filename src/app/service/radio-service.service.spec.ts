import { TestBed, inject } from '@angular/core/testing';

import { RadioServiceService } from './radio-service.service';

describe('RadioServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RadioServiceService]
    });
  });

  it('should ...', inject([RadioServiceService], (service: RadioServiceService) => {
    expect(service).toBeTruthy();
  }));
});
