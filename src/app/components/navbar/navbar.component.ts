import { Component } from '@angular/core';
import { JokesStore } from 'src/app/services/jokes-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  readonly title:string = 'Chuck Jokes';

  favoriteJokesCount = 0;

  constructor(jokesStore: JokesStore) {
    jokesStore.favoriteJokes$
      .subscribe(jokes => this.favoriteJokesCount = jokes.length);
  }
}
