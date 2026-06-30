import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

// Standalone Components
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { PillarsComponent } from './components/pillars/pillars.component';
import { CoreValuesComponent } from './components/core-values/core-values.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { EcosystemComponent } from './components/ecosystem/ecosystem.component';
import { ClientsComponent } from './components/clients/clients.component';
import { IndustriesComponent } from './components/industries/industries.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { RoiComponent } from './components/roi/roi.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

import { GsapService } from './services/gsap.service';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    PillarsComponent,
    CoreValuesComponent,
    ComparisonComponent,
    EcosystemComponent,
    ClientsComponent,
    IndustriesComponent,
    ExperienceComponent,
    RoiComponent,
    PricingComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private lenis: Lenis | null = null;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private gsapService: GsapService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Prevent browser from restoring scroll position, which causes jumps with GSAP
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Initialize Lenis smooth scroll
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      // Force scroll to top on load
      window.scrollTo(0, 0);
      this.lenis.scrollTo(0, { immediate: true });
      
      // Delay it slightly to override any browser default restoration after paint
      setTimeout(() => {
        window.scrollTo(0, 0);
        if (this.lenis) {
          this.lenis.scrollTo(0, { immediate: true });
        }
      }, 50);

      // Synchronize Lenis scrolling with ScrollTrigger
      this.gsapService.run((gsap, ScrollTrigger) => {
        this.lenis!.on('scroll', () => {
          ScrollTrigger.update();
        });

        const updateRaf = (time: number) => {
          this.lenis?.raf(time);
          requestAnimationFrame(updateRaf);
        };
        requestAnimationFrame(updateRaf);

        // Set lagSmoothing to 0 to prevent jumping during transitions
        gsap.ticker.lagSmoothing(0);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
    }
    
    // Global ScrollTrigger cleanup to prevent memory leaks
    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    });
  }
}
