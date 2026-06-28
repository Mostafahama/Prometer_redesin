import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-core-values',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core-values.component.html',
  styleUrls: ['./core-values.component.scss']
})
export class CoreValuesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('valuesSection', { static: true }) valuesSection!: ElementRef<HTMLElement>;

  public activeIndex = 0;
  public textOpacity = 1;
  private autoCycleInterval: any;
  private resumeTimeout: any;

  public texts = {
    en: {
      badge: 'Core Values',
      title: 'Our Analytical & Operational Philosophy',
      subtitle: 'Five core principles driving the daily performance of cosmetics promoters and advisors in the field.'
    },
    ar: {
      badge: 'القيم الأساسية',
      title: 'فلسفتنا التحليلية والتشغيلية',
      subtitle: 'خمسة مبادئ أساسية تقود الأداء اليومي لمروجي ومستشاري مستحضرات التجميل في الميدان.'
    }
  };

  private enValues = [
    {
      title: 'Clarity',
      desc: 'Full transparency in tracking promoter sales activities and daily display audits without any clutter.'
    },
    {
      title: 'Precision',
      desc: 'Geofenced GPS and real-time verification to prevent data manipulation and prove promoter presence.'
    },
    {
      title: 'Balanced Control',
      desc: 'Flexible team oversight balancing operational discipline with promoter empowerment.'
    },
    {
      title: 'Smart Forecast',
      desc: 'Analyzing purchase behaviors and counter inventory to predict demand and avoid out-of-stock scenarios.'
    },
    {
      title: 'Discipline',
      desc: 'Total adherence to schedule routes and visit plans ensuring comprehensive brand presence across counters.'
    }
  ];

  private arValues = [
    {
      title: 'الوضوح (Clarity)',
      desc: 'شفافية كاملة في تتبع مبيعات المروجين وجولات تدقيق العرض اليومية دون أي تعقيد.'
    },
    {
      title: 'الدقة (Precision)',
      desc: 'تحديد المواقع الجغرافي والتحقق الفوري لمنع التلاعب بالبيانات وإثبات وجود المروج في الميدان.'
    },
    {
      title: 'التحكم المتزن (Balanced Control)',
      desc: 'إشراف مرن على الفريق يوازن بين الانضباط التشغيلي وتمكين المروجين في الميدان.'
    },
    {
      title: 'التوقع الذكي (Smart Forecast)',
      desc: 'تحليل سلوكيات الشراء ومخزون منصات العرض للتنبؤ بالطلب وتفادي حالات نفاد المنتجات.'
    },
    {
      title: 'الانضباط (Discipline)',
      desc: 'الالتزام الكامل بالمسارات المجدولة وخطط الزيارات لضمان حضور شامل للعلامة التجارية عبر كافة المنصات.'
    }
  ];

  public get currentTextValues() {
    return this.langService.currentLang === 'en' ? this.enValues : this.arValues;
  }

  public get currentText() {
    return this.langService.currentLang === 'en' ? this.texts.en : this.texts.ar;
  }

  public get isAr(): boolean {
    return this.langService.currentLang === 'ar';
  }

  constructor(
    private gsapService: GsapService,
    private langService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.startAutoCycle();
  }

  ngAfterViewInit(): void {
    // Entrance animations if needed
    if (typeof document !== 'undefined') {
      this.gsapService.run((gsap) => {
        const path = document.querySelector('.logo-path') as SVGPathElement;
        if (path) {
          // Native stroke drawing animation using GSAP
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length
          });

          // Create an animation tied to ScrollTrigger so it draws when scrolled into view
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 3.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: this.valuesSection.nativeElement,
              start: 'top 60%'
            }
          });
        }
      });
    }
  }

  public selectPetal(index: number) {
    if (this.activeIndex === index) return;
    this.textOpacity = 0;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.activeIndex = index;
      this.textOpacity = 1;
      this.cdr.markForCheck();
    }, 200);
  }

  public onPetalHover(index: number): void {
    this.stopAutoCycle();
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    this.selectPetal(index);
  }

  public onPetalLeave(): void {
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    // Resume cycle after 3.5s of no interaction
    this.resumeTimeout = setTimeout(() => {
      this.startAutoCycle();
    }, 3500);
  }

  public getNumberPosition(index: number) {
    // Calculated for radius = 30.5% (aligning with the centers of the white logo loops)
    const positions = [
      { x: '50%', y: '19.5%' },
      { x: '79.0%', y: '40.6%' },
      { x: '67.9%', y: '74.7%' },
      { x: '32.1%', y: '74.7%' },
      { x: '21.0%', y: '40.6%' }
    ];
    return positions[index];
  }

  public get continuousFlowerPath(): string {
    // Generates a single path containing 5 full overlapping circles.
    // This perfectly recreates the internal connections of the ProMeter logo.
    // GSAP drawSVG will draw them sequentially as a single continuous animation.
    // Centers are at radius 122 (perfectly aligning with the numbers).
    // Circle radius is 82 (creating the exact overlapping intersections).
    const center = 200;
    const dist = 122;
    const r = 82;
    let path = '';
    
    for (let i = 0; i < 5; i++) {
      const angle = (i * 72 - 90) * Math.PI / 180;
      const cx = center + dist * Math.cos(angle);
      const cy = center + dist * Math.sin(angle);
      
      // Draw a full circle using two SVG arcs
      // M (cx - r), cy
      // A r, r 0 1,1 (cx + r), cy
      // A r, r 0 1,1 (cx - r), cy
      path += `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} `;
    }
    
    return path;
  }

  private startAutoCycle(): void {
    this.stopAutoCycle();
    this.autoCycleInterval = setInterval(() => {
      const nextIndex = (this.activeIndex + 1) % this.currentTextValues.length;
      this.selectPetal(nextIndex);
    }, 2800);
  }

  private stopAutoCycle(): void {
    if (this.autoCycleInterval) {
      clearInterval(this.autoCycleInterval);
      this.autoCycleInterval = null;
    }
  }

  ngOnDestroy(): void {
    this.stopAutoCycle();
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
  }
}
