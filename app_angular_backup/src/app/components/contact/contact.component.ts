import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GsapService } from '../../services/gsap.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef<HTMLElement>;

  // Form Models
  public name = '';
  public company = '';
  public email = '';
  public message = '';
  public isSent = false;

  private triggers: any[] = [];

  public texts = {
    en: {
      badge: 'Contact Support',
      title: 'Start Optimizing Your Field Team',
      desc: 'Have questions about setup, custom reports, or integrations? Send us a message and our support team will reach out in 24 hours.',
      infoTitle: 'Contact Info',
      successMsg: 'Your Message Has Been Sent!',
      nameLabel: 'Full Name',
      companyLabel: 'Company Name',
      emailLabel: 'Email Address',
      messageLabel: 'Your Message',
      btnText: 'Send Message'
    },
    ar: {
      badge: 'تواصل معنا',
      title: 'ابدأ بتحسين أداء فريقك الميداني',
      desc: 'لديك استفسارات حول التهيئة، التقارير المخصصة، أو عمليات الربط والتكامل؟ أرسل لنا رسالة وسيقوم فريق الدعم بالتواصل معك خلال 24 ساعة.',
      infoTitle: 'معلومات الاتصال',
      successMsg: 'تم إرسال رسالتك بنجاح!',
      nameLabel: 'الاسم الكامل',
      companyLabel: 'اسم الشركة',
      emailLabel: 'البريد الإلكتروني',
      messageLabel: 'رسالتك',
      btnText: 'إرسال الرسالة'
    }
  };

  private enInfo = [
    { label: 'Direct Phone', val: '+966 56 980 9566', color: '#CAE3DE' },
    { label: 'Official Email', val: 'info@prometer.sa', color: '#CAE3DE' },
    { label: 'Headquarters', val: 'Riyadh, Saudi Arabia', color: '#CAE3DE' },
    { label: 'Support Hours', val: 'Sat - Thu (9:00 AM - 6:00 PM)', color: '#CAE3DE' }
  ];

  private arInfo = [
    { label: 'الهاتف المباشر', val: '+966 56 980 9566', color: '#CAE3DE' },
    { label: 'البريد الإلكتروني', val: 'info@prometer.sa', color: '#CAE3DE' },
    { label: 'المقر الرئيسي', val: 'الرياض، المملكة العربية السعودية', color: '#CAE3DE' },
    { label: 'أوقات الدعم', val: 'السبت - الخميس (9:00 ص - 6:00 م)', color: '#CAE3DE' }
  ];

  public get info() {
    return this.langService.currentLang === 'en' ? this.enInfo : this.arInfo;
  }

  public get currentText() {
    return this.langService.currentLang === 'en' ? this.texts.en : this.texts.ar;
  }

  public get isAr(): boolean {
    return this.langService.currentLang === 'ar';
  }

  constructor(private gsapService: GsapService, private langService: LanguageService) {}

  ngOnInit(): void {}

  public onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.name || !this.email) return;

    this.isSent = true;
    setTimeout(() => {
      this.isSent = false;
      this.name = '';
      this.company = '';
      this.email = '';
      this.message = '';
    }, 3000);
  }

  ngOnDestroy(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.contactSection.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
