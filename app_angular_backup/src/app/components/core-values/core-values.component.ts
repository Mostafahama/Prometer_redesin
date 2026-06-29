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

  public petals: { path: string, cx: number, cy: number }[] = [];
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
    if (typeof window !== 'undefined') {
      this.startAutoCycle();
    }
    this.generatePetals();
  }

  private generatePetals(): void {
    const D = 122;
    const R = 82;
    const center = 200;

    const h = Math.sqrt(R * R - (D * Math.sin(36 * Math.PI / 180)) * (D * Math.sin(36 * Math.PI / 180)));
    const rOut = D * Math.cos(36 * Math.PI / 180) + h;
    const rIn = D * Math.cos(36 * Math.PI / 180) - h;

    this.petals = [];
    for (let i = 0; i < 5; i++) {
      const angleCenter = (i * 72 - 90) * Math.PI / 180;
      const angleL = ((i * 72 - 36) - 90) * Math.PI / 180;
      const angleR = ((i * 72 + 36) - 90) * Math.PI / 180;

      const oL = { x: center + rOut * Math.cos(angleL), y: center + rOut * Math.sin(angleL) };
      const oR = { x: center + rOut * Math.cos(angleR), y: center + rOut * Math.sin(angleR) };
      const iR = { x: center + rIn * Math.cos(angleR), y: center + rIn * Math.sin(angleR) };
      const iL = { x: center + rIn * Math.cos(angleL), y: center + rIn * Math.sin(angleL) };

      let path = `M ${oL.x} ${oL.y} `;
      path += `A ${R} ${R} 0 0 1 ${oR.x} ${oR.y} `;
      path += `A ${R} ${R} 0 0 0 ${iR.x} ${iR.y} `;
      path += `A ${R} ${R} 0 0 1 ${iL.x} ${iL.y} `;
      path += `A ${R} ${R} 0 0 0 ${oL.x} ${oL.y} Z`;

      const cx = center + D * Math.cos(angleCenter);
      const cy = center + D * Math.sin(angleCenter);

      this.petals.push({ path, cx, cy });
    }
  }

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      this.gsapService.run((gsap) => {
        const paths = document.querySelectorAll('.petal-path');
        if (paths.length > 0) {
          paths.forEach(p => {
            const length = (p as SVGPathElement).getTotalLength();
            gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
          });

          gsap.to(paths, {
            strokeDashoffset: 0,
            duration: 1.5,
            stagger: 0.2,
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
    this.resumeTimeout = setTimeout(() => {
      this.startAutoCycle();
    }, 3500);
  }

  public getNumberPosition(index: number) {
    if (this.petals && this.petals.length > index) {
      const cx = this.petals[index].cx;
      const cy = this.petals[index].cy;
      return { 
        x: (cx / 400 * 100) + '%', 
        y: (cy / 400 * 100) + '%' 
      };
    }
    return { x: '50%', y: '50%' };
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
