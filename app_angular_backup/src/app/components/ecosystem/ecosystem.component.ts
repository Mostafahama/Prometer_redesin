import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface ModuleItem {
  title: string;
  shortTitle: string;
  desc: string;
  color: string;
  svgPath: string;
}

interface CardPosition {
  left: number;
  top: number;
  z: number;
  scale: number;
  opacity: number;
}

@Component({
  selector: 'app-ecosystem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcosystemComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ecosystemRef', { static: true }) ecosystemRef!: ElementRef<HTMLElement>;
  @ViewChild('orbitScene', { static: false }) orbitScene!: ElementRef<HTMLDivElement>;

  public hoveredIndex: number | null = null;
  public sceneSize = 650;
  public cardSize = 100;
  public positions: CardPosition[] = [];

  private rafId: number | null = null;
  private startTime: number = 0;
  private isVisible = false;
  private observer: IntersectionObserver | null = null;

  public texts = {
    en: {
      badge: 'Technical Ecosystem',
      title: 'One Platform. Ten Integrated Modules.',
      desc: 'Each module operates seamlessly together to give you complete field visibility across every retail counter.',
      hint: 'Hover a module to explore'
    },
    ar: {
      badge: 'المنظومة التقنية',
      title: 'منصة واحدة. عشرة موديولات متكاملة.',
      desc: 'يعمل كل موديول بسلاسة وتكامل ليمنحك رؤية ميدانية شاملة عبر كل منافذ البيع بالتجزئة.',
      hint: 'مرر المؤشر فوق الموديول للاستكشاف'
    }
  };

  private enModules: ModuleItem[] = [
    {
      title: 'Sales Logging',
      shortTitle: 'Sales',
      desc: 'Instant sell-out reports submitted directly from the counter floor.',
      color: '#CAE3DE',
      svgPath: 'M3 18 h18 M6 18 v-5 M12 18 v-9 M18 18 v-14 M14 8 l4 -4 l4 4'
    },
    {
      title: 'GPS Attendance',
      shortTitle: 'Attendance',
      desc: 'GPS clock-in with geofencing and biometric selfie verification.',
      color: '#CAE3DE',
      svgPath: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
    },
    {
      title: 'Live GPS Tracking',
      shortTitle: 'GPS Track',
      desc: 'Live representative locations and dynamic route optimization on maps.',
      color: '#CAE3DE',
      svgPath: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
    },
    {
      title: 'Collections',
      shortTitle: 'Collect',
      desc: 'Digital receipts, credit terms, and cash reconciliation from counters.',
      color: '#CAE3DE',
      svgPath: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
    },
    {
      title: 'Inventory Audit',
      shortTitle: 'Inventory',
      desc: 'Real-time shelf stock audits and out-of-stock cosmetic tracking.',
      color: '#CAE3DE',
      svgPath: 'M20.25 7.5 12 12 3.75 7.5M12 12v9m-8.25-13.5v9a2.25 2.25 0 0 0 2.25 2.25h12a2.25 2.25 0 0 0 2.25-2.25v-9'
    },
    {
      title: 'Target Management',
      shortTitle: 'Targets',
      desc: 'Monthly KPI configurations with automated achievement bar metrics.',
      color: '#CAE3DE',
      svgPath: 'M2.25 18L9 9.75l5.25 5.25L21.75 7.5m0 0v5.25m0-5.25h-5.25'
    },
    {
      title: 'Visit Validation',
      shortTitle: 'Visits',
      desc: 'Verify every scheduled counter visit with timestamps and proof logs.',
      color: '#CAE3DE',
      svgPath: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
    },
    {
      title: 'Customer Profiles',
      shortTitle: 'Customers',
      desc: '360-degree pharmacy profiles, credit capacities, and customer logs.',
      color: '#CAE3DE',
      svgPath: 'M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
    },
    {
      title: 'Analytics Reports',
      shortTitle: 'Reports',
      desc: 'Custom analytics dashboards generated dynamically for administrators.',
      color: '#CAE3DE',
      svgPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z'
    },
    {
      title: 'Commission Calc.',
      shortTitle: 'Commission',
      desc: 'Automatic commission calculation based on sales threshold achievements.',
      color: '#CAE3DE',
      svgPath: 'M3 8 h12 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-12 a2 2 0 0 1 -2 -2 v-6 a2 2 0 0 1 2 -2 z M9 13 a2 2 0 1 0 0 -4 a2 2 0 0 0 0 4 z M14 11 l3 3 l6 -6'
    }
  ];

  private arModules: ModuleItem[] = [
    {
      title: 'تسجيل المبيعات',
      shortTitle: 'المبيعات',
      desc: 'تقارير مبيعات فورية يتم تقديمها مباشرة من أرضية المعرض.',
      color: '#CAE3DE',
      svgPath: 'M3 18 h18 M6 18 v-5 M12 18 v-9 M18 18 v-14 M14 8 l4 -4 l4 4'
    },
    {
      title: 'حضور الـ GPS',
      shortTitle: 'الحضور',
      desc: 'تسجيل حضور بالـ GPS مع تحديد جغرافي وتأكيد بالصورة الحيوية للوجه.',
      color: '#CAE3DE',
      svgPath: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
    },
    {
      title: 'تتبع مباشر',
      shortTitle: 'التتبع الجغرافي',
      desc: 'مواقع المندوبين المباشرة وتحسين المسارات الديناميكية على الخرائط.',
      color: '#CAE3DE',
      svgPath: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
    },
    {
      title: 'التحصيلات',
      shortTitle: 'التحصيل',
      desc: 'فواتير رقمية، شروط ائتمان، ومطابقة نقدية مباشرة من نقاط البيع.',
      color: '#CAE3DE',
      svgPath: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
    },
    {
      title: 'جرد المخزون',
      shortTitle: 'الجرد',
      desc: 'جرد فوري لمخزون الأرفف وتتبع المنتجات التجميلية النافدة من العرض.',
      color: '#CAE3DE',
      svgPath: 'M20.25 7.5 12 12 3.75 7.5M12 12v9m-8.25-13.5v9a2.25 2.25 0 0 0 2.25 2.25h12a2.25 2.25 0 0 0 2.25-2.25v-9'
    },
    {
      title: 'إدارة الأهداف',
      shortTitle: 'الأهداف',
      desc: 'إعدادات الأهداف الشهرية للمبيعات مع تتبع تلقائي لمستويات الإنجاز.',
      color: '#CAE3DE',
      svgPath: 'M2.25 18L9 9.75l5.25 5.25L21.75 7.5m0 0v5.25m0-5.25h-5.25'
    },
    {
      title: 'توثيق الزيارات',
      shortTitle: 'الزيارات',
      desc: 'التحقق من كل زيارة مجدولة لمنفذ البيع بتوقيت دقيق وسجلات إثبات حضور.',
      color: '#CAE3DE',
      svgPath: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
    },
    {
      title: 'ملفات العملاء',
      shortTitle: 'العملاء',
      desc: 'ملفات كاملة للصيدليات ومنافذ البيع، حدود الائتمان، وسجل المعاملات.',
      color: '#CAE3DE',
      svgPath: 'M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
    },
    {
      title: 'التقارير التحليلية',
      shortTitle: 'التقارير',
      desc: 'لوحات بيانات وتقارير تحليلية مخصصة يتم إنشاؤها تلقائياً للإدارة.',
      color: '#CAE3DE',
      svgPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z'
    },
    {
      title: 'حساب العمولات',
      shortTitle: 'العمولات',
      desc: 'حساب تلقائي لعمولات المبيعات بناءً على نسب تحقيق المستهدفات.',
      color: '#CAE3DE',
      svgPath: 'M3 8 h12 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-12 a2 2 0 0 1 -2 -2 v-6 a2 2 0 0 1 2 -2 z M9 13 a2 2 0 1 0 0 -4 a2 2 0 0 0 0 4 z M14 11 l3 3 l6 -6'
    }
  ];

  public get modules() {
    return this.langService.currentLang === 'en' ? this.enModules : this.arModules;
  }

  public get currentText() {
    return this.langService.currentLang === 'en' ? this.texts.en : this.texts.ar;
  }

  constructor(private cdr: ChangeDetectorRef, private langService: LanguageService) {}

  ngOnInit(): void {
    this.handleResize();
    this.startTime = performance.now();
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible) {
            this.startOrbitAnimation();
          } else {
            this.stopOrbitAnimation();
          }
        },
        { threshold: 0.05 }
      );
      this.observer.observe(this.ecosystemRef.nativeElement);
    } else {
      this.isVisible = true;
      this.startOrbitAnimation();
    }
  }

  @HostListener('window:resize')
  public handleResize(): void {
    if (typeof window !== 'undefined') {
      const vw = window.innerWidth;
      if (vw >= 1280) {
        this.sceneSize = 750;
        this.cardSize = 100;
      } else if (vw >= 1024) {
        this.sceneSize = 650;
        this.cardSize = 90;
      } else if (vw >= 768) {
        this.sceneSize = 520;
        this.cardSize = 75;
      } else {
        this.sceneSize = Math.min(320, vw - 48);
        this.cardSize = 54;
      }
    }
  }

  private startOrbitAnimation(): void {
    this.stopOrbitAnimation();

    // Duration for one full revolution (ms)
    const revolutionDuration = 22000;

    const tick = (now: number) => {
      const elapsed = now - this.startTime;
      let angle = (elapsed / revolutionDuration) * 2 * Math.PI;
      if (this.langService.currentLang === 'ar') {
        angle = -angle;
      }

      const cx = this.sceneSize / 2;
      const cy = this.sceneSize / 2;

      // Ellipse radii — wide & flat to simulate 3D tilt
      const rx = this.sceneSize * 0.43;
      const ry = this.sceneSize * 0.22;

      const count = this.modules.length;
      const offset = (2 * Math.PI) / count;

      this.positions = this.modules.map((_, i) => {
        const theta = angle + i * offset;

        const x = cx + rx * Math.cos(theta);
        const y = cy + ry * Math.sin(theta);

        // sin(theta) ranges -1 (top of ellipse) to +1 (bottom)
        const sinVal = Math.sin(theta); // -1 = back, +1 = front

        // Z-index: front cards on top of the man, back cards behind
        const z = sinVal > 0 ? 10 : 3;

        // Scale: front larger, back smaller (depth illusion)
        const scale = 0.72 + 0.3 * ((sinVal + 1) / 2);

        // Opacity: slightly fade background cards
        const opacity = 0.55 + 0.45 * ((sinVal + 1) / 2);

        return { left: x, top: y, z, scale, opacity };
      });

      this.cdr.markForCheck();
      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private stopOrbitAnimation(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  ngOnDestroy(): void {
    this.stopOrbitAnimation();
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
