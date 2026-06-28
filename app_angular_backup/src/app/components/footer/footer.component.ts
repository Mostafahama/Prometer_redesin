import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public currentYear = new Date().getFullYear();

  public texts = {
    en: {
      desc: 'One platform to streamline cosmetics promoter tracking, attendance, stock audits, and sell-out reports across pharmacies and retail outlets in the Middle East.',
      prodHeader: 'Product',
      compHeader: 'Company',
      legalHeader: 'Legal',
      aboutUs: 'About Us',
      careers: 'Careers',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: 'All rights reserved.',
      links: [
        { label: 'Home', anchor: '#hero' },
        { label: 'Comparison', anchor: '#why-us' },
        { label: 'Ecosystem', anchor: '#ecosystem' },
        { label: 'Interfaces', anchor: '#experience' },
        { label: 'Pricing', anchor: '#pricing' },
        { label: 'Contact', anchor: '#contact' }
      ]
    },
    ar: {
      desc: 'منصة متكاملة لتتبع مروجي مستحضرات التجميل، حضورهم، جرد المخزون، وتقارير المبيعات الفورية عبر الصيدليات ومنافذ البيع في الشرق الأوسط.',
      prodHeader: 'المنتج',
      compHeader: 'الشركة',
      legalHeader: 'قانوني',
      aboutUs: 'من نحن',
      careers: 'الوظائف',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      copyright: 'جميع الحقوق محفوظة.',
      links: [
        { label: 'الرئيسية', anchor: '#hero' },
        { label: 'المقارنة', anchor: '#why-us' },
        { label: 'المنظومة', anchor: '#ecosystem' },
        { label: 'الواجهات', anchor: '#experience' },
        { label: 'الأسعار', anchor: '#pricing' },
        { label: 'تواصل معنا', anchor: '#contact' }
      ]
    }
  };

  public get currentText() {
    return this.langService.currentLang === 'en' ? this.texts.en : this.texts.ar;
  }

  public get isAr(): boolean {
    return this.langService.currentLang === 'ar';
  }

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {}

  public scrollToSection(anchor: string): void {
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
