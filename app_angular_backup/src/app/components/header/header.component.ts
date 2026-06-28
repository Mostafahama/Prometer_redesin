import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public mobileMenuOpen = false;

  private enLinks = [
    { label: 'Home', anchor: '#hero' },
    { label: 'Comparison', anchor: '#why-us' },
    { label: 'Ecosystem', anchor: '#ecosystem' },
    { label: 'Interfaces', anchor: '#experience' },
    { label: 'Pricing', anchor: '#pricing' },
    { label: 'Contact', anchor: '#contact' }
  ];

  private arLinks = [
    { label: 'الرئيسية', anchor: '#hero' },
    { label: 'المقارنة', anchor: '#why-us' },
    { label: 'المنظومة', anchor: '#ecosystem' },
    { label: 'الواجهات', anchor: '#experience' },
    { label: 'الأسعار', anchor: '#pricing' },
    { label: 'تواصل معنا', anchor: '#contact' }
  ];

  public get navLinks() {
    return this.langService.currentLang === 'en' ? this.enLinks : this.arLinks;
  }

  public get currentLang(): string {
    return this.langService.currentLang;
  }

  public get buttonText(): string {
    return this.langService.currentLang === 'en' ? 'Request Demo' : 'طلب تجربة المنصة';
  }

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {}

  public toggleLanguage(): void {
    this.langService.toggleLanguage();
  }

  public toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  public scrollToSection(anchor: string): void {
    this.mobileMenuOpen = false;
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
