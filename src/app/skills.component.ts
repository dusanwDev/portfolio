import { Component, ChangeDetectionStrategy, signal, computed, effect, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  iconPath: string;
  delay: number;
}

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'skills-section',
    'role': 'region',
    'aria-label': 'Technical Skills'
  },
  imports: [CommonModule],
  template: `
    <div class="skills-container" #skillSesction>
      <h2 class="skills-title">Skills & Technologies</h2>
      <div class="skills-grid">
        @for (skill of visibleSkills(); track skill.name; let i = $index) {
          <div 
            [class]="'skill-card' + (inView() ? ' in-view' : '')" 
            [style.animation-delay]="skill.delay + 'ms'"
          >
            <div class="skill-icon">
              <img [src]="skill.iconPath" [alt]="skill.name + ' icon'" class="skill-svg" loading="lazy" />
            </div>
            <span class="skill-name">{{ skill.name }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .skills-section {
      width: 100%;
      background: #000;
      padding: 4rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .skills-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      background-color: #000;
      padding: 1.0625rem 0 0 0;
    }
    .skills-title {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-align: center;
      margin: 0;
      position: relative;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0.5rem;
      width: 100%;
      max-width: 1300px;
    }
    .skill-card {
      display: none;
    }
    .skill-card.in-view {
      background: #000000;
      border: 2px solid var(--skill-color, #8b5cf6);
      border-radius: 12px;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: translateY(30px);
      transition: border-color 0.4s, opacity 0.4s, transform 0.3s ease;

      animation: skillAppear 0.6s ease-out forwards;
    }

    .skill-icon {
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: border-color 0.4s, opacity 0.4s;
    }
    .skill-svg {
      width: 120px;
      height: 120px;
      display: block;
    }

    .skill-card:hover .skill-icon {
      border-color: #a855f7;
      opacity: 1;
    }
    .skill-name {
      font-size: 0.9rem;
      font-weight: 600;
      color: #ffffff;
      text-align: center;
      letter-spacing: 0.5px;
    }
    @keyframes skillAppear {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.8);
      }
      50% {
        opacity: 0.7;
        transform: translateY(-5px) scale(1.05);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    @media (max-width: 768px) {
      .skills-section {
        padding: 3rem 1rem;
      }
      .skills-title {
        font-size: 2rem;
      }
      .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1rem;
      }
      .skill-card {
        padding: 1.2rem 0.8rem;
      }
      .skill-icon {
        width: 80px;
        height: 80px;
      }
      .skill-svg {
        width: 80px;
        height: 80px;
      }
      .skill-card:nth-child(8) .skill-svg {
        width: 120px;
        height: 120px;
      }
      .skill-name {
        font-size: 0.8rem;
      }
    }
    @media (max-width: 480px) {
      .skills-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.8rem;
      }
      .skill-card {
        padding: 1rem 0.5rem;
      }
      .skill-icon {
        width: 48px;
        height: 48px;
      }
      .skill-svg {
        width: 48px;
        height: 48px;
      }
      .skill-card:nth-child(8) .skill-svg {
        width: 64px;
        height: 64px;
      }
      .skill-name {
        font-size: 0.75rem;
      }
    }
  `]
})
export class SkillsComponent {
  private readonly skills: Skill[] = [
    { name: 'Angular', iconPath: 'assets/icons/angular.svg', delay: 0 },
    { name: 'React', iconPath: 'assets/icons/react.svg', delay: 100 },
    { name: 'NextJS', iconPath: 'assets/icons/nextjs.svg', delay: 200 },
    { name: 'TypeScript', iconPath: 'assets/icons/typescript.svg', delay: 300 },
    { name: 'JavaScript', iconPath: 'assets/icons/javascript.svg', delay: 400 },
    { name: 'HTML', iconPath: 'assets/icons/html.svg', delay: 500 },
    { name: 'CSS', iconPath: 'assets/icons/css.svg', delay: 600 },
    { name: 'SASS', iconPath: 'assets/icons/sass.svg', delay: 700 },
    { name: 'Bootstrap', iconPath: 'assets/icons/bootstrap.svg', delay: 800 },
    { name: 'Docker', iconPath: 'assets/icons/docker.svg', delay: 900 }
  ];

  private readonly visibleCount = signal(0);
  readonly visibleSkills = computed(() => 
    this.skills.slice(0, this.visibleCount())
  );

  skillGlows = this.skills.map(() => signal(true));
  inView = signal(false);
  @ViewChild('skillSesction', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      const interval = setInterval(() => {
        if (this.visibleCount() < this.skills.length) {
          this.visibleCount.update(count => count + 1);
        } else {
          clearInterval(interval);
        }
      }, 150);

      return () => clearInterval(interval);
    });

    this.skillGlows.forEach((glow, i) => {
      effect(() => {
        const interval = setInterval(() => {
          glow.update(v => !v);
        }, 1200 + Math.random() * 1200);
        return () => clearInterval(interval);
      });
    });
  }
  ngAfterViewInit(): void {
    if (this.sectionRef) {
      const observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          // Only trigger if user has scrolled at least 50px
          if (entry.isIntersecting && window.scrollY > 50) {
            console.log('[SkillsComponent] Skills section is in view! Adding .in-view class.');
            console.log('[ProjectsComponent] Projects section is in view! Adding .in-view class.');
            this.inView.set(true);
            console.log(this.inView());
            observer.disconnect(); // Only trigger once
          }
        });
      }, { threshold: 0.4 });
      observer.observe(this.sectionRef.nativeElement);
    }
  }
} 