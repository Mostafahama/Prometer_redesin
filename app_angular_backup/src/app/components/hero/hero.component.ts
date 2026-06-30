import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';
import { LanguageService } from '../../services/language.service';

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

  public texts = {
    en: {
      title1: 'One Platform',
      title2: 'Total Field Visibility',
      subtitle: 'Complete Control One Touch',
      desc: 'Track and optimize field promoters in real-time across Middle Eastern pharmacies and retail counters. Verify employee attendance via GPS biometric verification, trace cosmetic shelf stock levels, and collect direct sales data to multiply operational revenue based on hard facts.',
      requestDemo: 'Request Demo',
      watchPlatform: 'Watch Platform',
      badge: 'Field Sales Intelligence Platform',
      screenshots: 'Real Platform Screenshots'
    },
    ar: {
      title1: 'منصة واحدة',
      title2: 'رؤية شاملة<br>أداء بلا حدود',
      subtitle: 'سيطرة كاملة بلمسة واحدة',
      desc: 'تتبع وحسّن أداء المروجين الميدانيين في الوقت الفعلي عبر الصيدليات ومنافذ التجزئة في الشرق الأوسط. تحقق من حضور الموظفين عبر نظام تحديد المواقع الجغرافي وبصمة الميدان، وتتبع مستويات مخزون مستحضرات التجميل على الأرفف، واجمع بيانات المبيعات المباشرة لمضاعفة أرباحك التشغيلية استناداً إلى الحقائق.',
      requestDemo: 'طلب تجربة المنصة',
      watchPlatform: 'شاهد الفيديو',
      badge: 'منصة ذكاء المبيعات الميدانية',
      screenshots: 'لقطات شاشة حقيقية للمنصة'
    }
  };

  private enKpis = [
    { label: 'Real-Time Sell-Out', val: '+47%', desc: 'Instant sales logging' },
    { label: 'Live GPS Tracking', val: '100%', desc: 'Promoter verification' },
    { label: 'Instant Analytics', val: '24/7', desc: 'Auto dashboard refresh' },
    { label: 'Customer Coverage', val: '360°', desc: 'Drill-down visit logs' },
    { label: 'Decision Making', val: '3x Faster', desc: 'Direct market response' },
  ];

  private arKpis = [
    { label: 'مبيعات فورية', val: '+47%', desc: 'تسجيل مبيعات لحظي' },
    { label: 'تتبع مباشر بالـ GPS', val: '100%', desc: 'التحقق من المروجين' },
    { label: 'تحليلات لحظية', val: '24/7', desc: 'تحديث تلقائي للوحة البيانات' },
    { label: 'تغطية شاملة', val: '360°', desc: 'تقارير زيارات مفصلة' },
    { label: 'اتخاذ القرار', val: '3x أسرع', desc: 'استجابة مباشرة للسوق' },
  ];

  public get kpis() {
    return this.langService.currentLang === 'en' ? this.enKpis : this.arKpis;
  }

  public get currentText() {
    return this.langService.currentLang === 'en' ? this.texts.en : this.texts.ar;
  }

  constructor(private gsapService: GsapService, private langService: LanguageService) {}

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

      // 2. Setup initial 3D Z-depths and rotations using GSAP to prevent overrides
      if (this.floatDashboard && this.floatSupervisor && this.floatPhone) {
        const isAr = this.langService.currentLang === 'ar';
        gsap.set(this.floatDashboard.nativeElement, { z: 10 });
        gsap.set(this.floatSupervisor.nativeElement, { z: 40, rotation: isAr ? -4 : 4 });
        gsap.set(this.floatPhone.nativeElement, { z: 50, rotation: isAr ? 6 : -6 });
      }

      // 3. Setup magnetic button tracking
      if (this.magneticBtn && this.magneticBtn.nativeElement) {
        this.gsapService.makeMagnetic(this.magneticBtn.nativeElement, 0.35);
      }

      // 4. Smooth background mouse glow and 3D mockup parallax using GSAP
      this.mouseMoveHandler = (e: MouseEvent) => {
        const normX = e.clientX / window.innerWidth - 0.5; // -0.5 to 0.5
        const normY = e.clientY / window.innerHeight - 0.5;
        const isAr = this.langService.currentLang === 'ar';

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

        // Animate floating screenshots offsets (explicitly keeping Z-depths and rotations)
        if (this.floatDashboard && this.floatSupervisor && this.floatPhone) {
          gsap.to(this.floatDashboard.nativeElement, {
            x: normX * 8,
            y: normY * 6,
            z: 10,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(this.floatSupervisor.nativeElement, {
            x: normX * 12,
            y: normY * 9,
            z: 40,
            rotation: isAr ? -4 : 4,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(this.floatPhone.nativeElement, {
            x: normX * 15,
            y: normY * 12,
            z: 50,
            rotation: isAr ? 6 : -6,
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
