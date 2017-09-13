import { TestBed, inject } from '@angular/core/testing';

import { SearchMusicService } from './search-music.service';

describe('SearchMusicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchMusicService]
    });
  });

  it('should ...', inject([SearchMusicService], (service: SearchMusicService) => {
    expect(service).toBeTruthy();
  }));
});
