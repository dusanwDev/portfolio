import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header.component';
import { CustomCursorComponent } from './custom-cursor.component';
import { LandingPageComponent } from './landing-page.component';
import { AboutMeComponent } from './about-me.component';
import { ProjectsComponent } from './projects.component';
import { SkillsComponent } from './skills.component';
import { ExperienceComponent } from './experience.component';
import { ContactComponent } from './contact.component';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, HeaderComponent, CustomCursorComponent, LandingPageComponent, AboutMeComponent, ProjectsComponent, SkillsComponent, ExperienceComponent, ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
