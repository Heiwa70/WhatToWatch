import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have app initialized', () => {
    expect(service.getApp()).toBeTruthy();
  });

  it('should have analytics initialized', () => {
    expect(service.getAnalytics()).toBeTruthy();
  });
});