import { Component, OnInit } from '@angular/core';

import { Joke } from './../../models/joke';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private static MAX_JOKES = 10;

  loadingJokes = false;
  jokes: Joke[] = [];

  ngOnInit () {
    if (!this.jokes.length) {
      this.loadingJokes = true;
      Promise.all(this.initJokes())
        .then(() => {
          // TODO: Enable interval
        })
        .finally(() => {
          this.loadingJokes = false;
        });
    } else {
      // TODO: Enable interval
    }
  }

  // Gets the first [MAX_JOKES] jokes
  private initJokes (): Promise<Joke>[] {
    const promises = [];
    for (let i = 0; i < HomeComponent.MAX_JOKES; i++) {
      promises.push(this.getNewJoke());
    }

    return promises;
  }

  // Fetches a new random joke
  getNewJoke () {
    // Remove last one when max is reached
    if (this.jokes.length >= HomeComponent.MAX_JOKES) {
      this.jokes.slice(0, -1);
    }

    return fetch('https://api.chucknorris.io/jokes/random')
        .then(res => res.json())
        .then(joke => {
          // Add at the beginning (newest first)
          this.jokes.unshift({
            id: joke.id,
            text: joke.value
          });

          return joke;
        });
  }

}
