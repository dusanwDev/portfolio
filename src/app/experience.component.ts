import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExperienceItem {
  company: string;
  logo: string;
  position: string;
  duration: string;
  description: string[];
}

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'experience-section',
    'role': 'region',
    'aria-label': 'Work Experience'
  },
  imports: [CommonModule],
  template: `
    <div class="experience-container">
      <h2 class="experience-title">Experience</h2>
      <div class="experience-content">
        @for (exp of experienceItems; track exp.company) {
          <div class="experience-item">
            <div class="company-header">
              <div class="company-logo">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="60px" height="60px" viewBox="0 0 200 200 " preserveAspectRatio="xMidYMid meet" class="__web-inspector-hide-shortcut__">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)" fill="#00eaff" stroke="none">
<path d="M730 1977 c-51 -27 -90 -90 -90 -145 0 -57 36 -119 86 -148 l44 -26 0 -306 0 -307 105 -134 105 -134 0 -369 c0 -236 4 -376 10 -389 14 -25 46 -25 60 0 6 13 10 156 10 398 l0 378 -110 140 -110 140 0 291 0 291 47 24 c54 28 93 90 93 149 0 87 -83 170 -170 170 -20 0 -56 -10 -80 -23z m150 -82 c38 -39 35 -98 -9 -137 -28 -25 -39 -29 -69 -24 -52 8 -87 47 -87 95 0 89 101 130 165 66z"/>
<path d="M1132 1539 c-127 -63 -120 -259 11 -308 l27 -11 0 -598 c0 -452 3 -601 12 -610 20 -20 48 -14 58 14 6 15 10 254 10 609 l0 585 39 19 c123 63 115 244 -13 302 -54 24 -91 24 -144 -2z m114 -64 c40 -16 68 -70 58 -110 -8 -32 -59 -75 -89 -75 -58 0 -105 47 -105 104 0 30 43 83 73 89 12 2 23 5 25 6 1 0 18 -6 38 -14z"/>
<path d="M260 1418 c-52 -36 -73 -71 -78 -132 -5 -65 20 -118 74 -155 37 -25 105 -33 155 -18 25 8 36 -3 208 -213 l181 -222 0 -327 c0 -241 3 -330 12 -339 18 -18 46 -14 58 7 6 13 10 141 10 349 l0 330 -195 237 c-139 169 -194 243 -189 254 32 75 27 139 -16 193 -46 59 -159 77 -220 36z m144 -69 c38 -30 49 -64 36 -105 -15 -43 -45 -64 -93 -64 -47 0 -97 44 -97 85 0 32 24 81 47 94 30 17 79 12 107 -10z"/>
<path d="M1585 1372 c-87 -41 -124 -129 -90 -218 16 -42 57 -83 98 -97 15 -6 17 -24 17 -189 l0 -183 -130 -130 -130 -130 0 -200 c0 -208 3 -225 42 -225 32 0 38 35 38 222 l0 183 130 130 130 130 0 191 0 192 29 12 c89 36 128 154 80 239 -43 77 -137 109 -214 73z m140 -87 c40 -39 37 -98 -6 -137 -41 -39 -90 -38 -130 1 -38 39 -39 87 -3 130 22 26 33 31 70 31 34 0 51 -6 69 -25z"/>
</g>
</svg>
              </div>
              <div class="company-info">
                <h3 class="company-name">{{ exp.company }}</h3>
                <p class="position">{{ exp.position }}</p>
                <p class="duration">{{ exp.duration }}</p>
              </div>
            </div>
            <div class="experience-description">
              <ul class="bullet-points">
                @for (point of exp.description; track point) {
                  <li>{{ point }}</li>
                }
              </ul>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .experience-section {
      width: 100%;
      padding: 4rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .experience-container {
      width: 100%;
      background-color: #000000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

    }
    .experience-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin: 0;
      position: relative;
      color: #00eaff;
    }

    .experience-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 1300px;    max-width: 1300px;
    }
    .experience-item {
      background: rgba(0, 0, 0, 0.3);
      border: 1.5px solid #00eaff;
      border-radius: 12px;
      padding: 2rem;
      transition: all 0.3s ease;
    }
    .experience-item:hover {
      box-shadow: 0 4px 32px 0 #00eaff22;
    }
    .company-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .company-logo {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
      
      //border: 1px solid #8b5cf6;
    }
    .company-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .company-info {
      flex: 1;
    }
    .company-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 0.5rem 0;
    }
    .position {
      font-size: 1.1rem;
      color: #8b5cf6;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }
    .duration {
      font-size: 0.9rem;
      color: #b0b8c1;
      margin: 0;
    }
    .experience-description {
      margin-top: 1rem;
    }
    .bullet-points {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .bullet-points li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      color: #b0b8c1;
      line-height: 1.6;
    }
    .bullet-points li::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: #8b5cf6;
      font-weight: bold;
    }
    @media (max-width: 768px) {
      .experience-section {
        padding: 3rem 1rem;
      }
      .experience-title {
        font-size: 2rem;
      }
      .company-header {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
      .experience-item {
        padding: 1.5rem;
      }
    }
  `]
})
export class ExperienceComponent {
  experienceItems: ExperienceItem[] = [
    {
      company: 'Edeja Software',
      logo: 'assets/technology-icon-converted.svg',
      position: 'Frontend Developer',
      duration: '2021 - Present',
      description: [
        'Developed responsive web applications using Angular and React frameworks',
        'Collaborated with cross-functional teams to deliver high-quality software solutions',
        'Implemented modern UI/UX designs with focus on accessibility and performance',
        'Optimized application performance and improved user experience',
        'Mentored junior developers and conducted code reviews'
      ]
    }
  ];

  constructor() {
    // Component logic will go here
  }
} 