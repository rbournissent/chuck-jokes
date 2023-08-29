import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { JokesStore } from './../../services/jokes-store.service';
import { Joke } from './../../models/joke';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private static NEW_JOKE_INTERVAL = 5; // seconds

  loadingJokes = false;
  jokes: Joke[] = [];
  intervalEnabled:boolean = true;
  newJokeInterval$?: Subscription;
  newJokeTimeRemaining = HomeComponent.NEW_JOKE_INTERVAL;
  intervalCounter = 0;

  constructor (private jokesStore: JokesStore) {
    this.jokesStore.jokes$.subscribe(jokes => this.jokes = jokes);
    this.jokesStore.intervalEnabled$
      .subscribe(enabled => this.intervalEnabled = enabled)
  }

  ngOnInit () {
    if (!this.jokes.length) {
      this.loadingJokes = true;
      Promise.all(this.initJokes())
        .then(() => {
          this.toggleInterval(true);
        })
        .finally(() => {
          this.loadingJokes = false;
        });
    } else {
      this.toggleInterval(this.intervalEnabled);
    }
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  // Gets the first [MAX_JOKES] jokes
  private initJokes (): Promise<Joke>[] {
    const promises = [];
    for (let i = 0; i < JokesStore.MAX_JOKES; i++) {
      promises.push(this.jokesStore.getNewJoke());
    }

    return promises;
  }

  toggleInterval (forcedValue?: boolean) {
    this.jokesStore.toggleInterval(forcedValue);

    if (this.intervalEnabled) {
      this.newJokeInterval$ = this.jokesStore.newJokeInterval.subscribe(() => {
        this.newJokeTimeRemaining--;

        if (!this.newJokeTimeRemaining) {
          // Get new joke
          this.jokesStore.getNewJoke();
          // Reset countdown
          this.newJokeTimeRemaining = HomeComponent.NEW_JOKE_INTERVAL;
        }
      });
    } else {
      this.stopInterval();
    }
  }

  stopInterval() {
    this.newJokeInterval$?.unsubscribe();
  }
}
