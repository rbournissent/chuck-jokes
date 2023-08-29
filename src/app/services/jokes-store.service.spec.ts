import { TestBed } from '@angular/core/testing';

import { JokesStore } from './jokes-store.service';

describe('JokesStoreService', () => {
  let service: JokesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
