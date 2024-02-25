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

  it('should have db initialized', () => {
    expect(service.getDb()).toBeTruthy();
  });

  it('should have document set', async () => {
    const data = {
      first : "test",
      last : "test",
      born : 1999};

   try {
     await service.addDocument("users", "test",data);
     expect(true).toBeTruthy();
   }catch(e){
      console.error(e);
      expect(false).toBeTruthy();
    }
  });
});