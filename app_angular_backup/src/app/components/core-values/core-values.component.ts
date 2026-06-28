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
    const positions = [
      { x: '50%', y: '25%' },
      { x: '73.8%', y: '42.3%' },
      { x: '64.7%', y: '70.2%' },
      { x: '35.3%', y: '70.2%' },
      { x: '26.2%', y: '42.3%' }
    ];
    return positions[index];
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
