import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  private triggers: any[] = [];
  
  public mobileTab: 'trad' | 'pm' = 'trad';

  public setMobileTab(tab: 'trad' | 'pm') {
    this.mobileTab = tab;
  }

  public texts = {
    en: {
      badge: 'Digital Transformation',
      title: 'Stop Managing Your Field Team the Old Way',
      subtitle: 'Replace manual spreadsheets and chaotic chats with an organized operational ecosystem engineered specifically for Middle Eastern cosmetics and beauty promoters.',
      tradTitle: 'Traditional Management',
      tradDesc: 'Fragmented communications and offline reporting leave cosmetics brands blind to promoter attendance, stock outs, and instant retail counter metrics.',
      tradOutcome: 'Outcome: Operational Inefficiency',
      pmTitle: 'The ProMeter Way',
      pmDesc: 'A single unified control panel connecting promoters directly to supervisors and management, ensuring 100% visibility of cosmetics sales and attendance.',
      pmOutcome: 'Outcome: Systematic Performance',
      ctaText: 'Empower your team with a platform built to eliminate administrative overhead.',
      ctaBtn: 'Start Your Digital Transformation'
    },
    ar: {
      badge: 'التحول الرقمي',
      title: 'أوقف إدارة فريقك الميداني بالطرق التقليدية',
      subtitle: 'استبدل جداول البيانات اليدوية والمحادثات العشوائية بمنظومة تشغيلية منظمة تم تصميمها خصيصاً لمروجي التجميل في الشرق الأوسط.',
      tradTitle: 'الإدارة التقليدية',
      tradDesc: 'الاتصالات المشتتة والتقارير غير المتصلة تترك العلامات التجارية غافلة عن حضور المروجين ونفاد المخزون ومؤشرات نقاط البيع.',
      tradOutcome: 'النتيجة: عدم كفاءة التشغيل',
      pmTitle: 'طريقة بروميتر (ProMeter)',
      pmDesc: 'لوحة تحكم موحدة تربط المروجين بالمشرفين والإدارة مباشرة، لضمان رؤية كاملة للمبيعات والحضور بنسبة 100%.',
      pmOutcome: 'النتيجة: أداء منظم وممنهج',
      ctaText: 'مكن فريقك بمنصة تم تصميمها لإلغاء الأعباء الإدارية والتعقيدات اليومية.',
      ctaBtn: 'ابدأ تحولك الرقمي الآن'
    }
  };

  private enTraditional = [
    { text: 'Chaotic WhatsApp Groups' },
    { text: 'Scattered & Delayed Excel Sheets' },
    { text: 'Slow, Late Email Summaries' },
    { text: 'Manual Phone Tracking' },
    { text: 'Delayed Operations Decisions' },
    { text: 'No Live Field Operations Visibility' },
    { text: 'Difficult Sales KPIs Monitoring' },
    { text: 'Higher Operations Supervision Cost' }
  ];

  private arTraditional = [
    { text: 'مجموعات واتساب عشوائية ومشتتة' },
    { text: 'ملفات إكسل مبعثرة ومتأخرة' },
    { text: 'ملخصات بريد إلكتروني بطيئة ومتأخرة' },
    { text: 'متابعة يدوية عبر المكالمات الهاتفية' },
    { text: 'قرارات تشغيلية متأخرة وغير دقيقة' },
    { text: 'غياب الرؤية المباشرة للعمليات الميدانية' },
    { text: 'صعوبة مراقبة مؤشرات الأداء والأهداف' },
    { text: 'تكاليف إشراف تشغيلي مرتفعة' }
  ];

  private enPrometer = [
    { text: 'One Centralized Platform' },
    { text: 'Real-Time Interactive Dashboard' },
    { text: 'Instant Automated Sales Reports' },
    { text: 'Verified GPS Biometric Proof' },
    { text: 'Live Representative Performance Logs' },
    { text: 'Instant Alerts & Notifications' },
    { text: 'Centralized Operations Workspace' },
    { text: 'Fact-Based Instant Decisions' }
  ];

  private arPrometer = [
    { text: 'منصة مركزية موحدة للميدان' },
    { text: 'لوحة بيانات تفاعلية في الوقت الفعلي' },
    { text: 'تقارير مبيعات فورية ومؤتمتة' },
    { text: 'تحقق حضور بالبصمة والـ GPS الموثق' },
    { text: 'سجلات أداء مباشرة للمندوبين والمروجين' },
    { text: 'تنبيهات وإشعارات فورية لحظة بلحظة' },
    { text: 'مساحة عمل مركزية متكاملة للعمليات' },
    { text: 'قرارات فورية مبنية على الحقائق والأرقام' }
  ];

  public get traditional() {
    return this.langService.currentLang === 'en' ? this.enTraditional : this.arTraditional;
  }

  public get prometer() {
    return this.langService.currentLang === 'en' ? this.enPrometer : this.arPrometer;
  }

  public get currentText() {
    return this.langService.currentLang === 'en' ? this.texts.en : this.texts.ar;
  }

  public get isAr() {
    return this.langService.currentLang === 'ar';
  }

  constructor(private gsapService: GsapService, private langService: LanguageService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      const cards = this.sectionRef.nativeElement.querySelectorAll('.rounded-2xl');

      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: this.sectionRef.nativeElement,
              start: 'top 75%',
              toggleActions: 'play none none none',
              onRefresh: (self) => {
                this.triggers.push(self);
              }
            }
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.triggers.forEach(trigger => {
      if (trigger) trigger.kill();
    });

    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.sectionRef.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
