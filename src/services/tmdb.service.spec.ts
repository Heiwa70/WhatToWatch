import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TmdbService } from './tmdb.service';

describe('TmdbService', () => {
  let service: TmdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // import HttpClientTestingModule
      providers: [TmdbService],
    });
    service = TestBed.inject(TmdbService); // inject TmdbService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('test', async () => {
    const movies = await service.getPopularMovies().subscribe(
      data => {
        console.log("print data");
        console.log(data);
      }
    );
    expect(movies).toBeTruthy();
  });
});