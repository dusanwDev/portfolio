import { NgFor, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { AboutMeComponent } from './about-me.component';

interface FallingBinary {
  top: number; // percent
  left: number; // percent
  value: string;
}

function randomBinaryString(length: number): string {
  let s = '';
  for (let i = 0; i < length; i++) {
    s += Math.random() > 0.5 ? '1' : '0';
  }
  return s;
}

function randomLeft(): number {
  // Avoid edges
  return 5 + Math.random() * 85;
}

@Component({
  selector: 'app-landing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'landing-hero-container',
    'role': 'main',
  },
  imports: [NgFor, NgIf],
  template: `
    <section [class]="'landing-hero'">
      <div [class]="'bg-decor'">
        <div [class]="'bg-glow bg-glow-blue'" [style.opacity]="blueActive() ? 0.35 : 0.08"></div>
        <div [class]="'bg-glow bg-glow-purple'" [style.opacity]="blueActive() ? 0.08 : 0.35"></div>
        <div [class]="'bg-vertical-line'"></div>
        <ng-container *ngFor="let bin of binaries(); let i = index">
          <span [class]="'bg-binary'" [style.top]="bin.top + '%'" [style.left]="bin.left + '%'">{{ bin.value }}</span>
        </ng-container>
        <ng-container *ngFor="let sq of squares; let i = index">
          <div [class]="'bg-square'" [class.square-glow-on]="squareGlows[i]()" [style.top]="sq.top" [style.left]="sq.left"></div>
        </ng-container>
      </div>
      <h1 [class]="'hero-title'">
        <span [class]="'gradient-text'">Dusan Nikolic</span>
      </h1>
      <h2 [class]="'hero-subtitle'">
        <span [class]="'subtitle-arrow'">&gt;</span>
        <span>{{ subtitleTyped() }}<span *ngIf="showCursor()" [class]="'typing-cursor'">|</span></span>
      </h2>
      <p [class]="'hero-tagline'">
        Crafting digital experiences with cutting-edge technology.<br />
        <span [class]="'tagline-highlight'">Building the future, one line of code at a time.</span>
      </p>
      <div [class]="'hero-actions'">
        <button [class]="'hero-btn hero-btn-primary'" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg> VIEW PROJECTS
        </button>
        <button [class]="'hero-btn hero-btn-outline'" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00c6ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg> DOWNLOAD CV
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
      opacity: 0.16;
      letter-spacing: 0.08em;
      z-index: 1;
      user-select: none;
      pointer-events: none;
      white-space: nowrap;
      transition: opacity 0.3s;
      text-shadow: 0 0 8px #00c6ff, 0 0 2px #fff;
    }
    .bg-square {
      position: absolute;
      width: 90px;
      height: 90px;
      border: 1px solid #00c6ff;
      border-radius: 12px;
      opacity: 0.2;
      z-index: 1;
      pointer-events: none;
      box-shadow: none;
      transition: border-color 0.4s, opacity 0.4s;
    }
    .bg-square.square-glow-on {
      border-color: #00eaff;
      opacity: 0.4;
      box-shadow: none;
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
      background-color:#111111;
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
      cursor: pointer; /* Changed from 'none' for better UX */
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
      font-family: inherit;
    }
    .hero-btn-primary {
      background: linear-gradient(90deg, #00c6ff 0%, #3a8dde 100%);
      color: black;
      box-shadow: 0 2px 16px 0 rgba(0,198,255,0.12);
    }
    .hero-btn-primary:hover {
      scale: 1.05;
      transition: scale 0.3s ease;
    }
    .hero-btn-outline {
      background: transparent;
      color: #00c6ff;
      border: 2px solid #00c6ff;
    }
    .hero-btn-outline:hover {
      background:rgb(0, 198, 255, 0.3);
      
      color: #fff;
      scale: 1.05;
      transition: scale 0.3s ease, background 0.3s ease, color 0.3s ease;
    }
    .pi {
      font-size: 1.3em;
      vertical-align: middle;
    }
    .typing-cursor {
      display: inline-block;
      width: 1ch;
      color: #00c6ff;
      animation: blink 1s steps(1) infinite;
      font-weight: 700;
      font-size: 1em;
      vertical-align: middle;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    /* Removed typewriter keyframes as they are not used with the current typing logic */
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

  // 5 animated binaries
  private readonly _binaries = signal<FallingBinary[]>(
    Array.from({ length: 5 }, () => ({
      top: Math.random() * 100,
      left: randomLeft(),
      value: randomBinaryString(20 + Math.floor(Math.random() * 10)),
    }))
  );
  readonly binaries = this._binaries.asReadonly();

  readonly subtitleFull = ' FRONTEND DEVELOPER';
  private readonly subtitleIndex = signal(0);
  readonly subtitleTyped = () => this.subtitleFull.slice(0, this.subtitleIndex());
  readonly subtitleDone = signal(false); // New signal to track if typing is done
  private readonly cursorBlink = signal(true);
  readonly showCursor = signal(true); // Always show cursor, let the typing effect control its blinking/visibility
  squareGlow = signal(true);

  squares = [
    { top: '10%', left: '20%' },
    { top: '25%', left: '75%' },
    { top: '60%', left: '15%' },
  ];
  squareGlows = this.squares.map(() => signal(true));

  constructor() {
    // Police light effect
    effect(() => {
      const policeInterval = setInterval(() => {
        this.blueActive.update(v => !v);
      }, 2500);
      return () => clearInterval(policeInterval);
    });

    // Binary animation
    effect(() => {
      const binaryInterval = setInterval(() => {
        this._binaries.update(arr =>
          arr.map(bin => {
            let newTop = bin.top + 0.4 + Math.random() * 0.8;
            let newValue = randomBinaryString(bin.value.length);
            if (newTop > 100) {
              // Reset to top with new left and value
              return {
                top: -10,
                left: randomLeft(),
                value: randomBinaryString(20 + Math.floor(Math.random() * 10)),
              };
            }
            return { ...bin, top: newTop, value: newValue };
          })
        );
      }, 60);
      return () => clearInterval(binaryInterval);
    });

    // Typing animation for subtitle and cursor control
    effect(() => {
      if (this.subtitleDone()) {
        // If typing is done, stop showing the cursor
        this.showCursor.set(false);
        return;
      }

      const typingInt = setInterval(() => {
        if (this.subtitleIndex() < this.subtitleFull.length) {
          this.subtitleIndex.update(i => i + 1);
        } else {
          clearInterval(typingInt);
          this.subtitleDone.set(true); // Mark typing as done
          // Keep the cursor blinking for a short period after typing is done
          setTimeout(() => {
            this.showCursor.set(false); // Hide cursor after a delay
          }, 1500); // Adjust delay as needed
        }
      }, 120); // Adjusted typing speed for smoother animation (was 320ms)

      const cursorInterval = setInterval(() => {
        if (!this.subtitleDone()) {
          this.cursorBlink.update(v => !v);
        } else {
          // Once typing is done, we let the setTimeout above handle hiding the cursor,
          // so this interval can stop blinking and remain visible until hidden.
          this.cursorBlink.set(true); // Ensure cursor is visible before hiding
          clearInterval(cursorInterval);
        }
      }, 500);

      // Return cleanup function for the effect
      return () => {
        clearInterval(typingInt);
        clearInterval(cursorInterval);
      };
    });

    // Neon square glow blink effect (independent for each square)
    this.squareGlows.forEach((glow, i) => {
      effect(() => {
        const interval = setInterval(() => {
          glow.update(v => !v);
        }, 1200 + Math.random() * 1200); // Each square blinks at a different interval
        return () => clearInterval(interval);
      });
    });
  }
}