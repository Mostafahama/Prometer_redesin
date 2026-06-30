import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';
import { LanguageService } from '../../services/language.service';

interface PlanItem {
  name: string;
  users: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular: boolean;
  features: string[];
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, OnDestroy {
  @ViewChild('pricingSection', { static: true }) pricingSection!: ElementRef<HTMLElement>;

  public yearlyMode = false;
  private triggers: any[] = [];

  public texts = {
    en: {
      badge: 'Platform Pricing',
      title: 'Flexible Pricing Plans for Every Team',
      billedMonthly: 'Billed Monthly',
      billedAnnually: 'Billed Annually',
      save20: 'Save 20%',
      promoTitle: 'Early Bird Special:',
      promoText: 'Get 20% discount on all plans this month!',
      promoBtn: 'Contact Sales',
      popular: 'Popular',
      sar: 'SAR',
      perMonth: 'per month',
      customPrice: 'Custom',
      customPriceDesc: 'contact us',
      chooseBtn: 'Choose Plan',
      contactBtn: 'Contact Sales'
    },
    ar: {
      badge: 'أسعار المنصة',
      title: 'خطط أسعار مرنة لكل فريق',
      billedMonthly: 'دفع شهري',
      billedAnnually: 'دفع سنوي',
      save20: 'وفر 20%',
      promoTitle: 'عرض الانضمام المبكر:',
      promoText: 'احصل على خصم 20% على جميع الخطط هذا الشهر!',
      promoBtn: 'تواصل مع المبيعات',
      popular: 'الأكثر شيوعاً',
      sar: 'ريال',
      perMonth: 'شهرياً',
      customPrice: 'مخصص',
      customPriceDesc: 'اتصل بنا',
      chooseBtn: 'اختر الخطة',
      contactBtn: 'تواصل مع المبيعات'
    }
  };

  private enPlans: PlanItem[] = [
    {
      name: 'Starter Plan',
      users: 'Up to 10 field promoters',
      monthlyPrice: 299,
      yearlyPrice: 239,
      isPopular: false,
      features: [
        'GPS tracking and check-ins',
        'Daily attendance verification',
        'Basic sales performance reports',
        '5GB secure cloud storage'
      ]
    },
    {
      name: 'Growth Plan',
      users: 'Up to 30 field promoters',
      monthlyPrice: 799,
      yearlyPrice: 639,
      isPopular: true,
      features: [
        'All Starter plan features',
        'Shelf inventory audits and logs',
        'Dedicated supervisor dashboards',
        'Auto commission calculation',
        '25GB secure cloud storage'
      ]
    },
    {
      name: 'Professional Plan',
      users: 'Up to 100 field promoters',
      monthlyPrice: 1499,
      yearlyPrice: 1199,
      isPopular: false,
      features: [
        'All Growth plan features',
        'Intelligent route sequence mapping',
        'Live sales targets sync',
        'Custom report exports',
        '24/7 priority support lines'
      ]
    },
    {
      name: 'Enterprise Plan',
      users: 'Above 100 field promoters',
      monthlyPrice: 0,
      yearlyPrice: 0,
      isPopular: false,
      features: [
        'Unlimited field promoters',
        'Dedicated secure cloud hosting',
        'Direct API integration with ERP systems',
        'Custom feature developments',
        'Guaranteed service SLA contract'
      ]
    }
  ];

  private arPlans: PlanItem[] = [
    {
      name: 'الباقة الأساسية',
      users: 'حتى 10 مسوقين ميدانيين',
      monthlyPrice: 299,
      yearlyPrice: 239,
      isPopular: false,
      features: [
        'تتبع الـ GPS وتسجيل الحضور الميداني',
        'التحقق اليومي من حضور وانصراف الفريق',
        'تقارير أداء مبيعات أساسية ومبسطة',
        'مساحة تخزين سحابية آمنة 5 جيجابايت'
      ]
    },
    {
      name: 'باقة النمو',
      users: 'حتى 30 مسوقاً ميدانياً',
      monthlyPrice: 799,
      yearlyPrice: 639,
      isPopular: true,
      features: [
        'جميع ميزات الباقة الأساسية',
        'تدقيق وسجلات جرد المخزون على الأرفف',
        'لوحات تحكم تفاعلية مخصصة للمشرفين',
        'حساب تلقائي للعمولات التشجيعية للمبيعات',
        'مساحة تخزين سحابية آمنة 25 جيجابايت'
      ]
    },
    {
      name: 'الباقة الاحترافية',
      users: 'حتى 100 مسوق ميداني',
      monthlyPrice: 1499,
      yearlyPrice: 1199,
      isPopular: false,
      features: [
        'جميع ميزات باقة النمو الميدانية',
        'تخطيط مسارات الزيارات الذكية للعملاء',
        'مزامنة وتتبع مباشر لأهداف المبيعات',
        'تصدير تقارير وتحليلات مخصصة للإدارة',
        'دعم فني متكامل ذو أولوية 24/7'
      ]
    },
    {
      name: 'باقة المؤسسات',
      users: 'أكثر من 100 مسوق ميداني',
      monthlyPrice: 0,
      yearlyPrice: 0,
      isPopular: false,
      features: [
        'عدد غير محدود من المسوقين والمناديب الميدانيين',
        'استضافة سحابية خاصة وآمنة للمؤسسة',
        'ربط مباشر مع أنظمة ERP عبر واجهات API',
        'تطوير وتخصيص ميزات خاصة بطلب العميل',
        'اتفاقية مستوى خدمة SLA معتمدة ومضمونة'
      ]
    }
  ];

  public get plans() {
    return this.langService.currentLang === 'en' ? this.enPlans : this.arPlans;
  }

  public get currentText() {
    return this.langService.currentLang === 'en' ? this.texts.en : this.texts.ar;
  }

  public get isAr(): boolean {
    return this.langService.currentLang === 'ar';
  }

  constructor(private gsapService: GsapService, private langService: LanguageService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.pricingSection.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
