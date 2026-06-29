import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';
import { LanguageService } from '../../services/language.service';

interface FeatureItem {
  text: string;
}

interface ViewItem {
  id: string;
  label: string;
  desc: string;
  image: string;
  features: FeatureItem[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('imageContainer', { static: false }) imageContainer!: ElementRef<HTMLDivElement>;

  public activeIndex = 0;
  public transitioning = false;
  public mouseX = 0;
  public mouseY = 0;

  private triggers: any[] = [];

  public texts = {
    en: {
      badge: 'System Dashboards',
      title: 'Three Integrated Views. One Unified System.',
      featuresHeader: 'Key View Features:'
    },
    ar: {
      badge: 'لوحات تحكم النظام',
      title: 'ثلاثة واجهات متكاملة. نظام موحد واحد.',
      featuresHeader: 'الميزات الرئيسية للواجهة:'
    }
  };

  private enViews: ViewItem[] = [
    {
      id: 'admin',
      label: 'Administrator Dashboard',
      desc: 'Complete command center for managers and executives to supervise all field sales activities, regions, and representative metrics.',
      image: 'assets/dashboard-1.webp',
      features: [
        { text: 'Live sell-out performance logging across all pharmacy counters' },
        { text: 'Dynamic GPS map listing all active promoter positions' },
        { text: 'Unified client database with visit histories and display reviews' },
        { text: 'Executive reports and charts built for executive decisions' },
        { text: 'Automated warnings for geofence breaches or route delays' }
      ]
    },
    {
      id: 'supervisor',
      label: 'Supervisor Workspace',
      desc: 'Dedicated oversight dashboard designed for field supervisors to verify daily promoter visits, attendance, and coach teams.',
      image: 'assets/dashboard-2.webp',
      features: [
        { text: 'Track real-time promoter team visits and sales achievement' },
        { text: 'Verify visit coordinates via geofenced GPS check-in reports' },
        { text: 'Audit daily biometric check-ins and total working hours' },
        { text: 'Compare active field sales performance vs target margins' },
        { text: 'Direct messaging and quick coaching tips to underperforming reps' }
      ]
    },
    {
      id: 'employee',
      label: 'Promoter Mobile App',
      desc: 'Mobile application designed for promoters to record sales, log display compliance, check-in, and review monthly commission achievements.',
      image: 'assets/dashboard-3.webp',
      features: [
        { text: 'Geofenced GPS attendance clock-in with selfie confirmation' },
        { text: 'Log counter visits with image uploads for shelf compliance' },
        { text: 'Register order sheets and cash/credit collections in real time' },
        { text: 'Track monthly target achievements and pending commissions' },
        { text: 'Access optimized route sequences to prevent time loss in transit' }
      ]
    }
  ];

  private arViews: ViewItem[] = [
    {
      id: 'admin',
      label: 'لوحة تحكم المدير المسؤول',
      desc: 'مركز قيادة كامل للمدراء والمسؤولين للإشراف على جميع الأنشطة الميدانية للمبيعات والمناطق ومؤشرات المناديب.',
      image: 'assets/dashboard-1.webp',
      features: [
        { text: 'تسجيل أداء المبيعات الفوري عبر جميع منافذ الصيدليات' },
        { text: 'خريطة تفاعلية بالـ GPS توضح مواقع المروجين النشطين' },
        { text: 'قاعدة بيانات موحدة للعملاء مع سجل الزيارات وتقييم العرض' },
        { text: 'تقارير وتحليلات متقدمة مصممة لدعم القرارات الإدارية' },
        { text: 'تنبيهات تلقائية في حالة تأخر المندوب أو خروجه عن النطاق الجغرافي' }
      ]
    },
    {
      id: 'supervisor',
      label: 'مساحة عمل المشرف الميداني',
      desc: 'لوحة تحكم مخصصة للمشرفين الميدانيين للتحقق من زيارات المروجين اليومية وحضورهم وتوجيه الفرق.',
      image: 'assets/dashboard-2.webp',
      features: [
        { text: 'متابعة زيارات فريق المروجين ونسب تحقيق المبيعات فوراً' },
        { text: 'التحقق من إحداثيات الزيارة عبر تقارير حضور الـ GPS الجغرافية' },
        { text: 'تدقيق الحضور بالبصمة الحيوية وإجمالي ساعات العمل اليومية' },
        { text: 'مقارنة أداء المبيعات الميداني الفعلي مع الأهداف المحددة' },
        { text: 'رسائل مباشرة ونصائح سريعة لتوجيه المندوبين الأقل أداءً' }
      ]
    },
    {
      id: 'employee',
      label: 'تطبيق الهاتف للمروج الميداني',
      desc: 'تطبيق هاتف ذكي مخصص للمروجين لتسجيل المبيعات وتوثيق حالة منصات العرض، وتسجيل الحضور ومتابعة العمولات.',
      image: 'assets/dashboard-3.webp',
      features: [
        { text: 'تسجيل حضور بالـ GPS الموثق جغرافياً مع التحقق بالصورة الشخصية' },
        { text: 'توثيق زيارات العرض بالصور للتحقق من مطابقة الأرفف للمعايير' },
        { text: 'تسجيل فواتير الطلبات والتحصيلات النقدية والائتمانية فوراً' },
        { text: 'تتبع تحقيق الأهداف الشهرية والعمولات المستحقة والنشطة' },
        { text: 'عرض مسارات الزيارات المحسنة لتجنب ضياع الوقت في التنقل' }
      ]
    }
  ];

  public get views() {
    return this.langService.currentLang === 'en' ? this.enViews : this.arViews;
  }

  public get currentText() {
    return this.langService.currentLang === 'en' ? this.texts.en : this.texts.ar;
  }

  constructor(private gsapService: GsapService, private langService: LanguageService) {}

  ngOnInit(): void {}

  public changeTab(index: number): void {
    if (index === this.activeIndex || this.transitioning) return;
    this.transitioning = true;
    setTimeout(() => {
      this.activeIndex = index;
      this.transitioning = false;
    }, 250);
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(e: MouseEvent): void {
    if (!this.imageContainer) return;
    const rect = this.imageContainer.nativeElement.getBoundingClientRect();
    if (!rect) return;
    
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    this.mouseX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
    this.mouseY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
  }

  ngOnDestroy(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.sectionRef.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
