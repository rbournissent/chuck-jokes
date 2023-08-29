import { JokesStore } from '../../services/jokes-store.service';
import { Component, Input } from '@angular/core';
import { Joke } from '../../models/joke';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent {
  @Input() joke?: Joke;
  favoriteJokesCount = 0;
  maxJokes = JokesStore.MAX_FAVORITE_JOKES;

  constructor (private jokesStore: JokesStore) {
    this.jokesStore.favoriteJokes$
      .subscribe(jokes => this.favoriteJokesCount = jokes.length)
  }

  toggleFavorite () {
    if (this.joke) {
      this.jokesStore.toggleFavorite(this.joke);
    }
  }
}
