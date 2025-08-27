import { NgFor, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

interface Project {
  title: string;
  description: string;
  image: string;
  badge: string;
  badgeType: 'LIVE' | 'ERP' | 'FRONTEND' | 'BACKEND';
  codeUrl?: string;
  liveUrl?: string;
}

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'projects-container',
    'role': 'region',
    'aria-label': 'Projects Section',
  },
  imports: [NgFor, NgIf],
  template: `
    <section id="projects-section" [class]="'projects-section'" #projectsSection>
      <div [class]="'projects-label'">
        <h2>All Projects</h2>
      </div>
      <div [class]="'projects-grid'">
        <div 
          *ngFor="let project of projects; let i = index" 
          [class]="'project-card' + (inView() ? ' project-card-' + (i === 0 ? 'left' : i === 1 ? 'middle' : 'right') : '')"
          [style.animation-delay]="(i * 200) + 'ms'"
        >
          <div [class]="'project-image-wrap'">
            <img [src]="project.image" [alt]="project.title + ' preview'" [class]="'project-image'" />
          </div>
          <div [class]="'project-badges'">
            <span [class]="'project-badge'" [class]="'project-badge-' + project.badgeType.toLowerCase()">{{ project.badge }}</span>
            <span *ngIf="project.badgeType !== 'LIVE'" [class]="'project-badge-type'">{{ project.badgeType }}</span>
          </div>
          <div [class]="'project-title'">{{ project.title }}</div>
          <div [class]="'project-desc'">{{ project.description }}</div>
          <div [class]="'project-tech'">
          </div>
          <div [class]="'project-actions'">
            <a  *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" rel="noopener" [class]="'project-btn project-btn-live'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg> Live Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-container {
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 0 4rem 0;
      min-height: 60vh;


    }
    .projects-label h2 {
      font-size: 2.5rem;
      font-weight: 700;
    }
    .projects-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .projects-label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: #00eaff;
      margin-bottom: 1rem;
      letter-spacing: 0.08em;
      font-weight: 900;
      width: 100%;
    }
    .projects-label-arrow {
      color: #00eaff;
      font-size: 2.2rem;
      font-weight: 900;
    }

    .projects-grid {
      width: 100%;
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
      align-items: stretch;
      max-width: 1300px;
      min-height: 420px;
      margin: 0 auto;
    }
    .project-card {
      background: #10131a;
      border: 1.5px solid #22242a;
      border-radius: 18px;
      box-shadow: 0 2px 24px 0 rgba(0,0,0,0.18);
      padding: 2.2rem 2.2rem 1.7rem 2.2rem;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      min-height: 435px;
      max-width: 440px;
      width: 100%;
      position: relative;
      transition: border 0.2s, box-shadow 0.2s;
      margin: 0 auto;
      opacity: 0;
      pointer-events: none;
      /* Remove animation here */
    }
    /* Only animate when .in-view is present */
    .in-view .project-card {
      opacity: 1;
      pointer-events: auto;
    }
    .project-card-left {
      animation: projectCardSlideFromLeft 0.8s ease-out forwards;
    }
    .project-card-middle {
      animation: projectCardSlideFromTop 0.8s ease-out forwards;
    }
    .project-card-right {
      animation: projectCardSlideFromRight 0.8s ease-out forwards;
    }
    .project-card:hover {
      border: 1.5px solid #00eaff;
      box-shadow: 0 4px 32px 0 #00eaff22;
    }
    .project-image-wrap {
      width: 100%;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.2rem;
    }
    .project-image {
      max-width: 100%;
      max-height: 100%;
      border-radius: 12px;
      object-fit: cover;
      background: #181b22;
      border: 1.5px solid #23272f;
      box-shadow: 0 2px 12px 0 #00eaff11;
    }
    .project-badges {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 0.7rem;
    }
    .project-badge {
      font-size: 1.02rem;
      font-family: inherit;
      font-weight: 700;
      padding: 0.18em 1.1em;
      border-radius: 16px;
      background: #1ecb7a;
      color: #fff;
      letter-spacing: 0.04em;
      margin-right: 0.5rem;
      display: inline-block;
      box-shadow: 0 2px 8px 0 #1ecb7a22;
    }
    .project-badge-live {
      background: #1ecb7a;
      color: #fff;
    }
    .project-badge-erp {
      background: #23272f;
      color: #b0b8c1;
    }
    .project-badge-frontend {
      background: #23272f;
      color: #00eaff;
    }
    .project-badge-backend {
      background: #23272f;
      color: #ff4ecd;
    }
    .project-badge-type {
      font-size: 1.02rem;
      font-family: inherit;
      font-weight: 700;
      color: #b0b8c1;
      letter-spacing: 0.04em;
      margin-left: auto;
      opacity: 0.7;
      background: none;
      border-radius: 0;
      padding: 0;
    }
    .project-title {
      font-size: 1.55rem;
      font-family: 'JetBrains Mono', 'Fira Mono', 'Consolas', monospace;
      font-weight: 900;
      color: #fff;
      margin-bottom: 0.5rem;
      margin-top: 0.2rem;
      letter-spacing: 0.01em;
      text-align: left;
    }
    .project-desc {
      font-size: 1.08rem;
      color: #b0b8c1;
      font-family: 'JetBrains Mono', 'Fira Mono', 'Consolas', monospace;
      margin-bottom: 1.1rem;
      line-height: 1.5;
      min-height: 60px;
      text-align: left;
    }
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem;
      margin-bottom: 1.2rem;
      margin-top: 0.2rem;
    }
    .project-tech-item {
      font-size: 1.02rem;
      color: #00eaff;
      background: #181b22;
      border-radius: 12px;
      padding: 0.13em 1.1em;
      font-family: inherit;
      font-weight: 600;
      letter-spacing: 0.01em;
      opacity: 0.85;
      box-shadow: 0 1px 4px 0 #00eaff11;
    }
    .project-actions {
      display: flex;
      gap: 1.1rem;
      margin-top: 1.5rem;
      align-items: center;
    }
    .project-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.13rem;
      font-family: inherit;
      font-weight: 700;
      border-radius: 12px;
      border: none;
      outline: none;
      padding: 0.5em 0.8em;
      text-decoration: none;
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
      cursor: pointer;
    }
    .project-btn-code {
      background: #181b22;
      color: white;
      outlline-color: white;
    }
    .project-btn-code:hover {
      outline: 1px solid #20D3EE;
      color: #20D3EE;
      transition: outline 1s, color 0.5s, stroke 0.5s;

      svg {
        stroke: #20D3EE;
      }
    }
    .project-btn-live {
      background-image: linear-gradient(to right, rgb(6 182 212 / 0.2), rgb(168 85 247 / 0.2));
      color: rgb(34, 211, 238);
      border: none;
      box-shadow: 0 2px 12px 0 #00eaff22;
      cursor: pointer;
      pointer-events: auto;
      
    }
    .project-btn-live:hover {
      scale: 1.1;
      transition: scale 0.5s;
    }

    .pi {
      font-size: 1.2em;
      vertical-align: middle;
    }
    @media (max-width: 900px) {
      .projects-section {
        max-width: 100%;
        padding: 0 0.5rem;
      }
      .projects-grid {
        gap: 1.2rem;
        grid-template-columns: 1fr;
      }
      .project-card {
        padding: 1.2rem 0.7rem 1rem 0.7rem;
        min-height: 340px;
        max-width: 100%;
      }
      .project-title {
        font-size: 1.1rem;
      }
      .project-desc {
        font-size: 0.95rem;
      }
    }
    @keyframes projectCardSlideFromLeft {
      0% {
        opacity: 0;
        transform: translateX(-100px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @keyframes projectCardSlideFromTop {
      0% {
        opacity: 0;
        transform: translateY(-100px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes projectCardSlideFromRight {
      0% {
        opacity: 0;
        transform: translateX(100px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @keyframes projectCardAppear {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `]
})
export class ProjectsComponent implements AfterViewInit {
  projects: Project[] = [
    {
      title: 'Election Tracker',
      description: 'Developed a practice project to strengthen understanding of core React concepts for building React applications.',
      image: '../../../assets/images/electiontracker.png',
      badge: 'LIVE',
      badgeType: 'FRONTEND',
      codeUrl: '#',
      liveUrl: 'https://stocksdemoproject.netlify.app/',
    },
    {
      title: 'Stock market',
      description: 'Built an Angular application to practice applying updates and new features from recent Angular releases.',
      image: '../../../assets/images/stockmarket.png',
      badge: 'LIVE',
      badgeType: 'FRONTEND',
      codeUrl: '#',
      liveUrl: 'https://stocksdemoproject.netlify.app/',
    },
    {
      title: 'Aruna',
      description: 'NextJs application built in order from me to grasp core nextjs conceptps and implement them in a project required by my employer.',
      image: '../../../assets/images/aruna.png',
      badge: 'LIVE',
      badgeType: 'FRONTEND',
      codeUrl: '#',
      liveUrl: 'https://arunahouserental.vercel.app/home',
    },
  ];

  inView = signal(false);
  @ViewChild('projectsSection', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (this.sectionRef) {
      const observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          // Only trigger if user has scrolled at least 50px
          if (entry.isIntersecting && window.scrollY > 50) {
            console.log('[ProjectsComponent] Projects section is in view! Adding .in-view class.');
            this.inView.set(true);
            observer.disconnect(); // Only trigger once
          }
        });
      }, { threshold: 0.4 });
      observer.observe(this.sectionRef.nativeElement);
    }
  }
} 