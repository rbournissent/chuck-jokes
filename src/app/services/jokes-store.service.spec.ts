import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { JokesStore } from './jokes-store.service';
import { Joke } from './../models/joke';

describe('JokesStore', () => {
  let service: JokesStore;

  describe('Pristine state (empty local storage)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(JokesStore);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have the API URL properly defined', () => {
      expect(JokesStore.API_URL).toBeDefined();
      expect(JokesStore.API_URL).toBe('https://api.chucknorris.io');
    });

    it('should have MAX_JOKES set to 10', () => {
      expect(JokesStore.MAX_JOKES).toBeDefined();
      expect(JokesStore.MAX_JOKES).toBe(10);
    });

    it('should have MAX_FAVORITE_JOKES set to 10', () => {
      expect(JokesStore.MAX_FAVORITE_JOKES).toBeDefined();
      expect(JokesStore.MAX_FAVORITE_JOKES).toBe(10);
    });

    it('should intialize jokes as an empty array', () => {
      service.jokes$.subscribe(jokes => {
        expect(jokes).toEqual([]);
      });
    });

    it ('should get a random joke when calling getNewJoke', () => {
      const randomJoke:Joke = {
        id: '1',
        text: 'random joke'
      };
      const okResponse = new Response(
        JSON.stringify(randomJoke),
        { status: 200, statusText: 'OK', });

      spyOn(window, 'fetch').and.resolveTo(okResponse);

      service.getNewJoke().then(joke => {
        expect(joke).toEqual(randomJoke);
      });

      expect(fetch).toHaveBeenCalledWith(`${JokesStore.API_URL}/jokes/random`);
    });

    it('should initialize intervalEnabled as true', (done) => {
      service.intervalEnabled$.subscribe(intervalEnabled => {
        expect(intervalEnabled).toBeTrue();
        done();
      });
    })

    it('should toggle the interval when calling toggleInterval', (done) => {
      service.toggleInterval();

      service.intervalEnabled$.subscribe(intervalEnabled => {
        expect(intervalEnabled).toBeFalse();
        done();
      });
    });

    it ('should toggle isFavorite when callign toggleFavorite', () => {
      const joke:Joke = {
        id: '1',
        text: 'random joke'
      };

      service.toggleFavorite(joke);
      expect(joke.isFavorite).toBeTrue();

      service.toggleFavorite(joke);
      expect(joke.isFavorite).toBeFalse();
    });
  });

  describe('Forced state in localStorage', () => {
    const favoriteJokes: Joke[] = [{
      id: '1',
      text: 'favorite',
      isFavorite: true
    }];

    it('Set favoriteJokes with data from localStorage', fakeAsync(() => {
      TestBed.configureTestingModule({});

      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify(favoriteJokes);
      });

      service = TestBed.inject(JokesStore);

      service.favoriteJokes$.subscribe(jokes => {
        expect(jokes).toEqual(favoriteJokes);
      });
    }));
  });
});
