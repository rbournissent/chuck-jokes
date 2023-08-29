import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';

import { ThemeSwitchComponent } from './theme-switch.component';

describe('ThemeSwitchComponent', () => {
  let component: ThemeSwitchComponent;
  let fixture: ComponentFixture<ThemeSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [ThemeSwitchComponent]
    });
    fixture = TestBed.createComponent(ThemeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch theme', () => {
    expect(component.selectedTheme).toBe(component.DARK_THEME);

    component.switchTheme();
    expect(component.selectedTheme).toBe(component.LIGHT_THEME);

    component.switchTheme();
    expect(component.selectedTheme).toBe(component.DARK_THEME);
  });
});
