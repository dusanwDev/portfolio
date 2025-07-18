import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'landing-hero-container',
    'role': 'main',
  },
  template: `
    <section [class]="'landing-hero'">
      <div [class]="'bg-decor'">
        <div [class]="'bg-glow bg-glow-blue'" [style.opacity]="blueActive() ? 0.35 : 0.08"></div>
        <div [class]="'bg-glow bg-glow-purple'" [style.opacity]="blueActive() ? 0.08 : 0.35"></div>
        <div [class]="'bg-vertical-line'"></div>
        <span [class]="'bg-binary'" [style.top]="'12%'" [style.left]="'8%'">11110111111001101110</span>
        <span [class]="'bg-binary'" [style.top]="'18%'" [style.left]="'56%'">01011010100010110010</span>
        <span [class]="'bg-binary'" [style.top]="'30%'" [style.left]="'80%'">1101110000010110100</span>
        <span [class]="'bg-binary'" [style.top]="'60%'" [style.left]="'12%'">100101110110001100</span>
        <span [class]="'bg-binary'" [style.top]="'70%'" [style.left]="'70%'">011111110101100100</span>
        <div [class]="'bg-square'" [style.top]="'10%'" [style.left]="'20%'"></div>
        <div [class]="'bg-square'" [style.top]="'25%'" [style.left]="'75%'"></div>
        <div [class]="'bg-square'" [style.top]="'60%'" [style.left]="'15%'"></div>
        <div [class]="'bg-square'" [style.top]="'65%'" [style.left]="'60%'"></div>
      </div>
      <h1 [class]="'hero-title'">
        <span [class]="'gradient-text'">Dusan Nikolic</span>
      </h1>
      <h2 [class]="'hero-subtitle'">
        <span [class]="'subtitle-arrow'">&gt;</span> FRONTEND SPECIALIST
      </h2>
      <p [class]="'hero-tagline'">
        Crafting digital experiences with cutting-edge technology.<br />
        <span [class]="'tagline-highlight'">Building the future, one line of code at a time.</span>
      </p>
      <div [class]="'hero-actions'">
        <button [class]="'hero-btn hero-btn-primary'" type="button">
          <i [class]="'pi pi-eye'" aria-hidden="true"></i> VIEW PROJECTS
        </button>
        <button [class]="'hero-btn hero-btn-outline'" type="button">
          <i [class]="'pi pi-download'" aria-hidden="true"></i> DOWNLOAD CV
        </button>
      </div>
    </section>
  `,
  styles: [`
    .landing-hero-container {
      width: 100%;
      min-height: calc(100vh - 80px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #000;
      position: relative;
      overflow: hidden;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    .bg-decor {
      position: absolute;
      inset: 0;
      width: 100vw;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }
    .bg-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      transition: opacity 1.8s cubic-bezier(0.4,0,0.2,1);
      pointer-events: none;
    }
    .bg-glow-blue {
      width: 600px;
      height: 600px;
      left: 18vw;
      top: 10vh;
      background: radial-gradient(circle, #00c6ff 0%, transparent 70%);
    }
    .bg-glow-purple {
      width: 600px;
      height: 600px;
      right: 10vw;
      top: 20vh;
      background: radial-gradient(circle, #ff00cc 0%, transparent 70%);
    }
    .bg-vertical-line {
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, #00c6ff33 0%, #ff00cc33 100%);
      opacity: 0.18;
      transform: translateX(-50%);
      z-index: 1;
    }
    .bg-binary {
      position: absolute;
      color: #00c6ff;
      font-size: 1.1rem;
      font-family: 'JetBrains Mono', 'Fira Mono', 'Consolas', monospace;
      opacity: 0.13;
      letter-spacing: 0.08em;
      z-index: 1;
      user-select: none;
      pointer-events: none;
    }
    .bg-square {
      position: absolute;
      width: 90px;
      height: 90px;
      border: 2px solid #00c6ff;
      border-radius: 12px;
      opacity: 0.06;
      z-index: 1;
      pointer-events: none;
    }
    .landing-hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      width: 100%;
      height: 100vh;
      text-align: center;
      z-index: 2;
      background-color: black;
    }
    .hero-title {
      font-size: 4rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      margin: 0;
      line-height: 1.1;
    }
    .gradient-text {
      background: linear-gradient(90deg, #00c6ff 0%, #ff00cc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: 2.2rem;
      font-weight: 700;
      color: #b0b8c1;
      margin: 0;
      letter-spacing: 0.04em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .subtitle-arrow {
      color: #00c6ff;
      font-size: 2.2rem;
      font-weight: 900;
      margin-right: 0.3rem;
    }
    .hero-tagline {
      font-size: 1.3rem;
      color: #b0b8c1;
      font-family: 'JetBrains Mono', 'Fira Mono', 'Consolas', monospace;
      margin: 0;
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
    .tagline-highlight {
      color: #00c6ff;
      font-weight: 700;
      font-size: 1.25em;
      letter-spacing: 0.01em;
    }
    .hero-actions {
      display: flex;
      gap: 1.5rem;
      margin-top: 2.5rem;
      justify-content: center;
    }
    .hero-btn {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 1.2rem;
      font-weight: 600;
      padding: 0.9rem 2.2rem;
      border-radius: 12px;
      border: none;
      outline: none;
      cursor: none;
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
      font-family: inherit;
    }
    .hero-btn-primary {
      background: linear-gradient(90deg, #00c6ff 0%, #3a8dde 100%);
      color: #fff;
      box-shadow: 0 2px 16px 0 rgba(0,198,255,0.12);
    }
    .hero-btn-primary:hover {
      background: linear-gradient(90deg, #00c6ff 0%, #ff00cc 100%);
      color: #fff;
    }
    .hero-btn-outline {
      background: transparent;
      color: #00c6ff;
      border: 2px solid #00c6ff;
    }
    .hero-btn-outline:hover {
      background: #00c6ff;
      color: #fff;
    }
    .pi {
      font-size: 1.3em;
      vertical-align: middle;
    }
    @media (max-width: 700px) {
      .hero-title {
        font-size: 2.3rem;
      }
      .hero-subtitle {
        font-size: 1.2rem;
      }
      .hero-tagline {
        font-size: 1rem;
      }
      .hero-actions {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class LandingPageComponent {
  blueActive = signal(true);

  constructor() {
    effect(() => {
      const interval = setInterval(() => {
        this.blueActive.update(v => !v);
      }, 2500);
      return () => clearInterval(interval);
    });
  }
} 