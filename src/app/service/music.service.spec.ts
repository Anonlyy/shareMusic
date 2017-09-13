import { TestBed, inject } from '@angular/core/testing';

import { MusicService } from './music.service';

describe('MusicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicService]
    });
  });

  it('should ...', inject([MusicService], (service: MusicService) => {
    expect(service).toBeTruthy();
  }));
});
