import { Component } from '@angular/core';

import { Joke } from './../../models/joke';
import { JokesStore } from 'src/app/services/jokes-store.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoriteJokes: Joke[] = [];

  constructor(private jokesStore: JokesStore) {
    this.jokesStore.favoriteJokes$
      .subscribe(jokes => this.favoriteJokes = jokes);
  }
}
