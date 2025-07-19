import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about-me',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'about-me-container',
    'role': 'region',
    'aria-label': 'About Me Section',
  },
  template: `
    <section [class]="'about-me-section'">
      <h2 [class]="'about-title'">
        <span [class]="'about-title-bracket'">&lt;</span>
        <span [class]="'about-title-gradient'">ABOUT_ME</span>
        <span [class]="'about-title-bracket'">/&gt;</span>
      </h2>
      <p [class]="'about-desc'">
        My name is Martin Wainaina, a Full-Stack Developer passionate about building comprehensive digital solutions with 6+ years of experience<br />
        building scalable <span [class]="'about-highlight-cyan'">web applications</span>, <span [class]="'about-highlight-purple'">mobile apps</span>, and <span [class]="'about-highlight-pink'">ERP systems</span>.<br />
        Specialized in React, PHP, and React Native, delivering high-performance solutions that drive business growth and enhance user experiences.
      </p>
    </section>
  `,
  styles: [`
    .about-me-container {
      width: 100%;
      background: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 5rem 0 4rem 0;
      min-height: 60vh;
    }
    .about-me-section {
      width: 100%;
      background-color: #000;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .about-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'JetBrains Mono', 'Fira Mono', 'Consolas', monospace;
      font-size: 1.1rem;
      color: #00eaff;
      margin-bottom: 1.5rem;
      letter-spacing: 0.08em;
      font-weight: 600;
    }
    .about-label-arrow {
      color: #00eaff;
      font-size: 1.2rem;
      font-weight: 700;
    }
    .about-label-text {
      color: #00eaff;
      font-size: 1.1rem;
      font-weight: 600;
    }
    .about-title {
      font-size: 3.2rem;
      font-family: 'JetBrains Mono', 'Fira Mono', 'Consolas', monospace;
      font-weight: 900;
      margin: 0 0 2.2rem 0;
      letter-spacing: 0.04em;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .about-title-bracket {
      color: #00eaff;
      font-size: 3.2rem;
      font-weight: 900;
      letter-spacing: 0.01em;
    }
    .about-title-gradient {
      background: linear-gradient(90deg, #00eaff 0%, #a259ff 50%, #ff4ecd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      font-size: 3.2rem;
      font-weight: 900;
      letter-spacing: 0.04em;
    }
    .about-desc {
      font-size: 1.25rem;
      color: #b0b8c1;
      font-family: 'JetBrains Mono', 'Fira Mono', 'Consolas', monospace;
      margin: 0;
      margin-top: 0.5rem;
      line-height: 1.7;
      max-width: 800px;
    }
    .about-highlight-cyan {
      color: #00eaff;
      font-weight: 700;
    }
    .about-highlight-purple {
      color: #a259ff;
      font-weight: 700;
    }
    .about-highlight-pink {
      color: #ff4ecd;
      font-weight: 700;
    }
    @media (max-width: 700px) {
      .about-title, .about-title-bracket, .about-title-gradient {
        font-size: 2rem;
      }
      .about-desc {
        font-size: 1rem;
      }
      .about-me-container {
        padding: 2.5rem 0 2rem 0;
      }
    }
  `]
})
export class AboutMeComponent {} 