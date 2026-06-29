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
      id: 'supervisor',
      label: 'Supervisors',
      desc: 'Save time and streamline your operations with a smart system that automatically collects all required data and generates comprehensive sales reports with just one click.',
      image: 'assets/dashboard-2.webp',
      features: [
        { text: 'Detailed real-time sales reports' },
        { text: 'Integrated coaching reports' },
        { text: 'Advanced performance insights to identify and improve promoter weaknesses' },
        { text: 'Flexible brand target setting based on sales value or quantity sold, with the ability to assign specific unit targets for each product within the brand' },
        { text: 'Zone Limit tracking with instant notifications when employees leave their assigned area' }
      ]
    },
    {
      id: 'admin',
      label: 'Company Decision Makers',
      desc: 'A powerful all-in-one dashboard that gives you complete visibility over your operations, including total monthly sales, target achievement rates, employee attendance, and workforce insights.',
      image: 'assets/dashboard-3.webp',
      features: [
        { text: 'Live sales and performance tracking' },
        { text: 'Visual charts showing sales trends and target progress' },
        { text: 'Target distribution analytics across teams and locations' },
        { text: 'Top-performing employees ranking for smarter performance management' }
      ]
    },
    {
      id: 'employee',
      label: 'Employees',
      desc: 'Transform your promoter management into a smarter and more efficient experience with an all-in-one system.',
      image: 'assets/dashboard-1.webp',
      features: [
        { text: 'Location-based attendance tracking' },
        { text: 'Advanced sales entry with multiple products in a single transaction for accurate KPI measurement' },
        { text: 'Real-time target and commission tracking' },
        { text: 'Precise inventory management' },
        { text: 'Complete visibility over sales performance and operational insights in real time' }
      ]
    }
  ];

  private arViews: ViewItem[] = [
    {
      id: 'supervisor',
      label: 'المشرفين',
      desc: 'وفّر وقتك وجهدك مع نظام ذكي يجمع كل البيانات المطلوبة تلقائيًا ويحوّلها إلى تقارير احترافية شاملة لجميع تفاصيل المبيعات بضغطة زر.',
      image: 'assets/dashboard-2.webp',
      features: [
        { text: 'تقارير مبيعات لحظية ودقيقة' },
        { text: 'تقارير الزيارات الميدانية متكامل للبروموتر' },
        { text: 'تحليل أداء يساعدك على اكتشاف نقاط ضعف الموظفين وتطويرها بكفاءة' },
        { text: 'إمكانية تحديد أهداف البراند بكل مرونة، سواء بالقيمة البيعية أو بعدد القطع، مع تحديد هدف خاص بعدد القطع لكل منتج ضمن البراند' },
        { text: 'خاصية Zone Limit مع تنبيهات فورية عند خروج الموظف من النطاق المحدد' }
      ]
    },
    {
      id: 'admin',
      label: 'أصحاب القرار في الشركة',
      desc: 'لوحة تحكم متكاملة تمنحك رؤية شاملة لأداء أعمالك، تشمل إجمالي مبيعات الشهر، نسبة تحقيق الأهداف، إجمالي الموظفين والحضور، مع تقارير وتحليلات لحظية تساعدك على اتخاذ القرار بسرعة واحترافية',
      image: 'assets/dashboard-3.webp',
      features: [
        { text: 'متابعة مباشرة للمبيعات والأداء' },
        { text: 'تشارت احترافي يوضح اتجاه المبيعات وتحقيق الأهداف' },
        { text: 'تحليل وتوزيع الأهداف على الفروع والموظفين' },
        { text: 'عرض أفضل الموظفين أداءً لرفع كفاءة فريق العمل' }
      ]
    },
    {
      id: 'employee',
      label: 'الموظفين',
      desc: 'حوّل إدارة فريق البروموتر إلى تجربة أكثر ذكاءً وكفاءة مع نظام متكامل.',
      image: 'assets/dashboard-1.webp',
      features: [
        { text: 'تسجيل الحضور والانصراف بالموقع المحدد' },
        { text: 'توثيق المبيعات بإمكانية إضافة عدة منتجات في العملية الواحدة لقياس الـ KPI بدقة' },
        { text: 'متابعة لحظية للأهداف ونسب الإنجاز والعمولات' },
        { text: 'إدارة دقيقة للمخزون عبر لوحة تحكم احترافية' },
        { text: 'رؤية شاملة لجميع تفاصيل الأداء والمبيعات في الوقت الفعلي' }
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
