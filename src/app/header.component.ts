import { Component, ChangeDetectionStrategy, computed, signal, effect } from '@angular/core';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'header-container',
    'role': 'banner',
  },
  template: `
    <header [class]="'header'">
      <nav [class]="'header-nav'" aria-label="Main navigation">
        <ul [class]="'nav-list'">
          <li [class]="'nav-item'">
            <a [class]="'nav-link nav-link-active'">HOME</a>
          </li>
          <li [class]="'nav-item'">
            <a href="#about" [class]="'nav-link'"><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>  </span> ABOUT</a>
          </li>
          <li [class]="'nav-item'">
            <a href="#projects" [class]="'nav-link'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-icon lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg> Projects</a>
          </li>
          <li [class]="'nav-item'">
            <a href="#skills" [class]="'nav-link'"><span aria-hidden="true">&lt;/&gt;</span> SKILLS</a>
          </li>

          <li [class]="'nav-item'">
            <a href="#experience" [class]="'nav-link'"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-icon lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg> Experience</a>
          </li>

          <li [class]="'nav-item'">
            <a href="#contact" [class]="'nav-link'"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-icon lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> CONTACT</a>
          </li>
        </ul>
      </nav>
      <div [class]="'header-status'">
        <span [class]="'status-dot'" aria-label="Online"></span>
        <span [class]="'status-text'">ONLINE</span>
        <span [class]="'status-sep'">|</span>
        <span [class]="'status-label'">STATUS:</span>
        <span [class]="'status-ready'">READY</span>
      </div>
    </header>
  `,
  styles: [`
    .header-container {
      width: 100%;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 10;
    }
    .header {
      width: 100%;
      background-color: black;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 2rem;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .logo-bg {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #00c6ff 0%, #ff00cc 100%);
      box-shadow: 0 0 16px 0 rgba(0,0,0,0.2);
    }
    .logo-icon {
      font-size: 1.8rem;
      color: #fff;
      user-select: none;
    }
    .brand {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      line-height: 1.1;
    }
    .brand-name {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      background: linear-gradient(90deg, #00c6ff 0%, #ff00cc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .brand-time {
      font-size: 0.9rem;
      color: #b0b8c1;
      margin-top: 0.1rem;
      font-family: inherit;
    }
    .header-nav {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
    }
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-item {
      display: flex;
      align-items: center;
    }
    .nav-link {
      color: #fff;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 700;
      padding: 0.5rem 1.2rem;
      border-radius: 10px;
      transition: background 0.2s, color 0.2s;
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .nav-link i {
      font-size: 1.2rem;
      color: inherit;
    }
    .nav-link-active {
      background: linear-gradient(90deg, #00c6ff 0%, #ff00cc 100%);
      color: #fff;
      font-weight: 700;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.12);
    }
    .nav-link:not(.nav-link-active):hover {
      background: rgba(255,255,255,0.08);
      color: #00c6ff;
    }
    .header-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.1rem;
      font-family: inherit;
    }
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #1ecb7a;
      display: inline-block;
      margin-right: 0.2rem;
      animation: statusPulse 1.2s infinite cubic-bezier(0.4, 0, 0.6, 1);
    }
    @keyframes statusPulse {
      0% {
        box-shadow: 0 0 0 0 rgba(30, 203, 122, 0.7);
        transform: scale(1);
      }
      70% {
        box-shadow: 0 0 0 8px rgba(30, 203, 122, 0);
        transform: scale(1.25);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(30, 203, 122, 0);
        transform: scale(1);
      }
    }
    .status-text {  
      font-size: 12px;
      color: #b0b8c1;
      font-weight: 500;
      margin-right: 0.5rem;
    }
    .status-sep {
      color: #444a56;
      margin: 0 0.5rem;
    }
    .status-label {
      color: #b0b8c1;
      font-weight: 500;
      font-size: 12px;
    }
    .status-ready {
      color: #00c6ff;
      font-weight: 700;
      font-size: 12px;
    }
    @media (max-width: 900px) {
      .header {
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem 0.5rem;
      }
      .header-nav {
        margin: 0.5rem 0;
      }
    }
  `]
})
export class HeaderComponent {
  private readonly now = signal(new Date());

  readonly time = computed(() => {
    const d = this.now();
    return d.toLocaleTimeString([], { hour12: false });
  });

  constructor() {
    effect(() => {
      const interval = setInterval(() => {
        this.now.set(new Date());
      }, 1000);
      return () => clearInterval(interval);
    });
  }
} 