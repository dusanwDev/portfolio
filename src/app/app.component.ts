import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { CustomCursorComponent } from './custom-cursor.component';
import { LandingPageComponent } from './landing-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CustomCursorComponent, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
