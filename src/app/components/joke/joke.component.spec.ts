import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { JokeComponent } from './joke.component';
import { Joke } from 'src/app/models/joke';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;
  const joke: Joke = {
    id: '1',
    text: 'Laugh, please!'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
      ],
      declarations: [JokeComponent]
    });
    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    component.joke = joke;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a joke defined', () => {
    expect(component.joke).toBeDefined();
    expect(component.joke).toEqual(joke);
  });

  it('should toggle joke as favorite', () => {
    expect(component.joke?.isFavorite).toBeUndefined();

    component.toggleFavorite();
    expect(component.joke?.isFavorite).toBeTrue();

    component.toggleFavorite();
    expect(component.joke?.isFavorite).toBeFalse();
  });
});
