import { ComponentFixture, TestBed, fakeAsync, tick, flush, discardPeriodicTasks } from '@angular/core/testing';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home.component';
import { JokesStore } from 'src/app/services/jokes-store.service';
import { JokeComponent } from '../joke/joke.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: JokesStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressBarModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        HomeComponent,
        JokeComponent
      ],
      providers: [JokesStore]
    });

    fixture = TestBed.createComponent(HomeComponent);
    service = TestBed.inject(JokesStore);
    component = fixture.componentInstance;
  });

  describe('Before ngOnInit', () => {
    beforeEach(() => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      spyOn<any>(component, 'initJokes').and.returnValues([]);
      spyOn(component, 'toggleInterval').and.callThrough();
      spyOn(service, 'getNewJoke').and.callThrough();
    });

    it('should get a new joke after 5 secs', fakeAsync(() => {

      fixture.detectChanges();

      expect(component['initJokes']).toHaveBeenCalled();

      flush();
      discardPeriodicTasks();

      expect(component.loadingJokes).toBeFalse();
      expect(component.toggleInterval).toHaveBeenCalled();

      // Force time remaining to 1 and let pass 1sec
      component.newJokeTimeRemaining = 1;
      tick(1000);
      expect(service.getNewJoke).toHaveBeenCalled();

      // Time remaininng should reset
      expect(component.newJokeTimeRemaining).toBe(5);
    }));

    it('should start interval even with jokes already present', () => {
      component.jokes = [{
        id: '1',
        text: 'a joke'
      }];

      fixture.detectChanges();

      expect(component['initJokes']).not.toHaveBeenCalled();
      expect(component.loadingJokes).toBeFalse();
      expect(component.toggleInterval)
        .toHaveBeenCalledWith(component.intervalEnabled);
    });
  })

  describe('After ngOnInit', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize jokes as an empty array', () => {
      expect(component.jokes).toBeDefined();
      expect(component.jokes).toEqual([]);
    });

    it('should start loadingJokes', () => {
      expect(component.loadingJokes).toBeTrue();
    });

    it ('should initialize intervalEnabled as true', () => {
      expect(component.intervalEnabled).toBeTrue();
    });

    it ('should toggle interval', () => {
      component.toggleInterval();
      expect(component.intervalEnabled).toBeFalse();

      component.toggleInterval();
      expect(component.intervalEnabled).toBeTrue();
    });
  });
});
