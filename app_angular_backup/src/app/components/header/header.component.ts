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
    { label: 'Ecosystem', anchor: '#ecosystem' },
    { label: 'Dashboards', anchor: '#experience' },
    { label: 'ROI', anchor: '#roi' },
    { label: 'Pricing', anchor: '#pricing' },
    { label: 'Partners', anchor: '#clients' }
  ];

  private arLinks = [
    { label: 'الرئيسية', anchor: '#hero' },
    { label: 'المنظومة', anchor: '#ecosystem' },
    { label: 'لوحات التحكم', anchor: '#experience' },
    { label: 'العائد', anchor: '#roi' },
    { label: 'الأسعار', anchor: '#pricing' },
    { label: 'شركاء النجاح', anchor: '#clients' }
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
    const target = document.querySelector(anchor) as HTMLElement;
    if (target) {
      const headerOffset = 80; // Fixed header height
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
