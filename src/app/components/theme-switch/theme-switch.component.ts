import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent {
  readonly LIGHT_THEME_CLASS = 'light-theme';
  readonly LIGHT_THEME = 'light';
  readonly DARK_THEME = 'dark';

  selectedTheme:string;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.selectedTheme = this.document.documentElement.classList
      .contains(this.LIGHT_THEME_CLASS)
      ? this.LIGHT_THEME
      : this.DARK_THEME;
  }

  switchTheme() {
    this.selectedTheme = this.selectedTheme === this.LIGHT_THEME
      ? this.DARK_THEME
      : this.LIGHT_THEME;

    if (this.selectedTheme === this.LIGHT_THEME) {
      this.document.documentElement.classList
        .add(this.LIGHT_THEME_CLASS);
    } else {
      this.document.documentElement.classList
        .remove(this.LIGHT_THEME_CLASS);
    }
  }
}
