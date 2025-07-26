import { Component, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
  color: string;
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
    <div class="skills-container">
      <h2 class="skills-title">Skills & Technologies</h2>
      <div class="skills-grid">
        @for (skill of visibleSkills(); track skill.name; let i = $index) {
          <div 
            class="skill-card" 
            [class.skill-glow-on]="skillGlows[i]()"
            [style.animation-delay]="skill.delay + 'ms'"
            [style.--skill-color]="skill.color"
          >
            <div 
              class="skill-icon" 
            >
              <i [class]="skill.icon"></i>
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
      padding: 1.0625rem 0rem;
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
      animation: skillAppear 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
      transition: border-color 0.4s, opacity 0.4s, transform 0.3s ease;
    }
    .skill-card.skill-glow-on {
      border-color: #a855f7;
    }
    .skill-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(139, 92, 246, 0.1),
        transparent
      );
      transition: left 0.5s ease;
    }
    .skill-card:hover {
      transform: translateY(-5px);
    }
    .skill-card:hover::before {
      left: 100%;
    }
    .skill-icon {
      font-size: 2.5rem;
      color: var(--skill-color, #8b5cf6);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid #8b5cf6;
      opacity: 0.2;
    }
    .skill-card:hover .skill-icon {
      border-color: #a855f7;
      opacity: 0.4;
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
        font-size: 2rem;
        width: 50px;
        height: 50px;
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
        font-size: 1.8rem;
        width: 45px;
        height: 45px;
      }
      .skill-name {
        font-size: 0.75rem;
      }
    }
  `]
})
export class SkillsComponent {
  private readonly skills: Skill[] = [
    { name: 'Angular', icon: 'pi pi-angular', color: '#ba86ff', delay: 0 },
    { name: 'React', icon: 'pi pi-react', color: '#ba86ff', delay: 100 },
    { name: 'NextJS', icon: 'pi pi-code', color: '#ba86ff', delay: 200 },
    { name: 'TypeScript', icon: 'pi pi-code', color: '#ba86ff', delay: 300 },
    { name: 'JavaScript', icon: 'pi pi-code', color: '#ba86ff', delay: 400 },
    { name: 'HTML', icon: 'pi pi-code', color: '#ba86ff', delay: 500 },
    { name: 'CSS', icon: 'pi pi-code', color: '#ba86ff', delay: 600 },
    { name: 'SASS', icon: 'pi pi-code', color: '#ba86ff', delay: 700 },
    { name: 'Bootstrap', icon: 'pi pi-code', color: '#ba86ff', delay: 800 },
    { name: 'Docker', icon: 'pi pi-code', color: '#ba86ff', delay: 900 }
  ];

  private readonly visibleCount = signal(0);
  readonly visibleSkills = computed(() => 
    this.skills.slice(0, this.visibleCount())
  );

  // Create glow signals for each skill
  skillGlows = this.skills.map(() => signal(true));

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

    // Neon skill glow blink effect (independent for each skill)
    this.skillGlows.forEach((glow, i) => {
      effect(() => {
        const interval = setInterval(() => {
          glow.update(v => !v);
        }, 1200 + Math.random() * 1200); // Each skill blinks at a different interval
        return () => clearInterval(interval);
      });
    });
  }
} 