import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class GsapService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  /**
   * Run code only if executing in the browser.
   */
  public run(callback: (gsapInstance: typeof gsap, scrollTriggerInstance: typeof ScrollTrigger) => void): void {
    if (this.isBrowser) {
      callback(gsap, ScrollTrigger);
    }
  }

  /**
   * Helper to animate mouse magnetic elements safely.
   */
  public makeMagnetic(element: HTMLElement, strength: number = 0.3): void {
    if (!this.isBrowser) return;

    element.addEventListener('mousemove', (e: MouseEvent) => {
      const bound = element.getBoundingClientRect();
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  }
}
