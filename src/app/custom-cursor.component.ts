import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.pointerEvents]': '"none"',
    '[style.position]': '"fixed"',
    '[style.top]': '"0"',
    '[style.left]': '"0"',
    '[style.width]': '"100%"',
    '[style.height]': '"100%"',
    '[style.zIndex]': '"9999"',
    '[style.display]': '"block"',
  },
  template: `
    <div [class]="'cursor-outer' + (isFocus() ? ' cursor-focus' : '')" [style.transform]="'translate(' + (x() - 38) + 'px, ' + (y() - 38) + 'px)'">
      <div [class]="'cursor-corner cursor-corner-tl'"></div>
      <div [class]="'cursor-corner cursor-corner-tr'"></div>
      <div [class]="'cursor-corner cursor-corner-bl'"></div>
      <div [class]="'cursor-corner cursor-corner-br'"></div>
      <div [class]="'cursor-ring'"></div>
      <div [class]="'cursor-dot'"></div>
    </div>
  `,
  styles: [`
    .cursor-outer {
      position: absolute;
      width: 76px;
      height: 76px;
      pointer-events: none;
      z-index: 9999;
      top: 0;
      left: 0;
      transition: none;
    }
    .cursor-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #1de9f6;
      transform: translate(-50%, -50%);
      opacity: 0.2;
    }
    .cursor-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #1de9f6;
      box-shadow: 0 0 8px 2px #1de9f6;
      transform: translate(-50%, -50%);
      opacity: 0.9;
    }
    .cursor-corner {
      position: absolute;
      width: 18px;
      height: 18px;
      border: 2px solid #1de9f6;
      opacity: 0.7;
    }
    .cursor-corner-tl {
      top: 0;
      left: 0;
      border-right: none;
      border-bottom: none;
      border-top-left-radius: 6px;
    }
    .cursor-corner-tr {
      top: 0;
      right: 0;
      border-left: none;
      border-bottom: none;
      border-top-right-radius: 6px;
    }
    .cursor-corner-bl {
      bottom: 0;
      left: 0;
      border-right: none;
      border-top: none;
      border-bottom-left-radius: 6px;
    }
    .cursor-corner-br {
      bottom: 0;
      right: 0;
      border-left: none;
      border-top: none;
      border-bottom-right-radius: 6px;
    }
    .cursor-outer.cursor-focus .cursor-ring {
      width: 32px;
      height: 32px;
      border-width: 2.5px;
      opacity: 0.35;
      transition: width 0.18s, height 0.18s, opacity 0.18s;
    }
    .cursor-outer.cursor-focus .cursor-corner {
      width: 8px;
      height: 8px;
      border-width: 2.5px;
      opacity: 0.9;
      transition: width 0.18s, height 0.18s, opacity 0.18s;
    }
  `]
})
export class CustomCursorComponent {
  private readonly pos = signal({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  isFocus = signal(false);

  readonly x = () => this.pos().x;
  readonly y = () => this.pos().y;

  constructor() {
    effect(() => {
      const move = (e: MouseEvent) => {
        this.pos.set({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', move);
      return () => window.removeEventListener('mousemove', move);
    });
    // Focus effect for <a> and <button>
    effect(() => {
      const onOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a,button')) {
          this.isFocus.set(true);
        }
      };
      const onOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a,button')) {
          this.isFocus.set(false);
        }
      };
      window.addEventListener('mouseover', onOver);
      window.addEventListener('mouseout', onOut);
      return () => {
        window.removeEventListener('mouseover', onOver);
        window.removeEventListener('mouseout', onOut);
      };
    });
  }
} 