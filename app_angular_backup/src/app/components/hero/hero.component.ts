import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroTitle', { static: true }) heroTitle!: ElementRef<HTMLHeadingElement>;
  @ViewChild('heroSubtitle', { static: true }) heroSubtitle!: ElementRef<HTMLHeadingElement>;
  @ViewChild('heroText', { static: true }) heroText!: ElementRef<HTMLParagraphElement>;
  @ViewChild('heroCta', { static: true }) heroCta!: ElementRef<HTMLDivElement>;
  @ViewChild('magneticBtn', { static: false }) magneticBtn!: ElementRef<HTMLElement>;
  @ViewChild('kpisContainer', { static: true }) kpisContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('glowOverlay', { static: true }) glowOverlay!: ElementRef<HTMLDivElement>;
  
  // Parallax elements
  @ViewChild('floatContainer', { static: false }) floatContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('floatDashboard', { static: false }) floatDashboard!: ElementRef<HTMLDivElement>;
  @ViewChild('floatSupervisor', { static: false }) floatSupervisor!: ElementRef<HTMLDivElement>;
  @ViewChild('floatPhone', { static: false }) floatPhone!: ElementRef<HTMLDivElement>;

  private timeline: any;
  private mouseMoveHandler: any;

  // Real localized cosmetic & beauty KPIs (English)
  public kpis = [
    { label: 'Real-Time Sell-Out', val: '+47%', desc: 'Instant sales logging' },
    { label: 'Live GPS Tracking', val: '100%', desc: 'Promoter verification' },
    { label: 'Instant Analytics', val: '24/7', desc: 'Auto dashboard refresh' },
    { label: 'Customer Coverage', val: '360°', desc: 'Drill-down visit logs' },
    { label: 'Decision Making', val: '3x Faster', desc: 'Direct market response' },
  ];

  constructor(private gsapService: GsapService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gsapService.run((gsap) => {
      // 1. Text entrance stagger fade-up
      const targets = [
        this.heroTitle.nativeElement,
        this.heroSubtitle.nativeElement,
        this.heroText.nativeElement,
        this.heroCta.nativeElement,
        this.kpisContainer.nativeElement.children
      ];

      this.timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      this.timeline
        .fromTo(targets, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, delay: 0.3 }
        )
        .fromTo(this.glowOverlay.nativeElement,
          { opacity: 0, scale: 0.8 },
          { opacity: 0.6, scale: 1, duration: 2, ease: 'power2.out' },
          '-=1.5'
        );

      // 2. Setup magnetic button tracking
      if (this.magneticBtn && this.magneticBtn.nativeElement) {
        this.gsapService.makeMagnetic(this.magneticBtn.nativeElement, 0.35);
      }

      // 3. Smooth background mouse glow and 3D mockup parallax using GSAP
      this.mouseMoveHandler = (e: MouseEvent) => {
        const normX = e.clientX / window.innerWidth - 0.5; // -0.5 to 0.5
        const normY = e.clientY / window.innerHeight - 0.5;

        // Animate background glow
        gsap.to(this.glowOverlay.nativeElement, {
          x: normX * 60,
          y: normY * 60,
          duration: 1.5,
          ease: 'power2.out'
        });

        // Animate 3D mockup container tilt
        if (this.floatContainer) {
          gsap.to(this.floatContainer.nativeElement, {
            rotateY: normX * 6,
            rotateX: -normY * 8,
            duration: 0.5,
            ease: 'power2.out'
          });
        }

        // Animate floating screenshots offsets
        if (this.floatDashboard && this.floatSupervisor && this.floatPhone) {
          gsap.to(this.floatDashboard.nativeElement, {
            x: normX * 8,
            y: normY * 6,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(this.floatSupervisor.nativeElement, {
            x: normX * 12,
            y: normY * 9,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(this.floatPhone.nativeElement, {
            x: normX * 15,
            y: normY * 12,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      };
      window.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
    });
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
    if (this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }
}
