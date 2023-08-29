import { Component, OnInit } from '@angular/core';

import { JokesStore } from './../../services/jokes-store.service';
import { Joke } from './../../models/joke';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loadingJokes = false;
  jokes: Joke[] = [];

  constructor (private jokesStore: JokesStore) {
    this.jokesStore.jokes$.subscribe(jokes => this.jokes = jokes);
  }

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
    for (let i = 0; i < JokesStore.MAX_JOKES; i++) {
      promises.push(this.jokesStore.getNewJoke());
    }

    return promises;
  }
}
