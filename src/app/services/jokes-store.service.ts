import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Joke } from '../models/joke';

@Injectable({
  providedIn: 'root'
})
export class JokesStore {
  static API_URL = 'https://api.chucknorris.io';
  static MAX_JOKES = 10;

  private jokes = new BehaviorSubject<Joke[]>([]);
  jokes$ = this.jokes.asObservable();

  constructor() { }

   // Fetches a new random joke
   getNewJoke () {
    // Remove last one when max is reached
    if (this.jokes.getValue().length >= JokesStore.MAX_JOKES) {
      this.jokes.next(this.jokes.getValue().slice(0, -1));
    }

    return fetch(`${JokesStore.API_URL}/jokes/random`)
        .then(res => res.json())
        .then(joke => {
          // Add at the beginning (newest first)
          this.jokes.next([
            {
              id: joke.id,
              text: joke.value
            },
            ...this.jokes.getValue()
          ]);

          return joke;
        });
  }
}
