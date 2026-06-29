import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('clientsSection', { static: true }) clientsSection!: ElementRef<HTMLElement>;

  private triggers: any[] = [];

  public rows = [
    { dirClass: 'animate-marquee-ltr', brands: ['Al-Dawaa', 'Al Nahdi', 'Extra', 'Jarir'] },
    { dirClass: 'animate-marquee-rtl', brands: ['Lulu', 'Carrefour', 'Tamimi', 'Othaim'] },
    { dirClass: 'animate-marquee-ltr', brands: ['Panda', 'Danube', 'Al-Dawaa', 'Al Nahdi'] },
    { dirClass: 'animate-marquee-rtl', brands: ['Extra', 'Jarir', 'Lulu', 'Carrefour'] },
    { dirClass: 'animate-marquee-ltr', brands: ['Tamimi', 'Othaim', 'Panda', 'Danube'] }
  ];

  public text = {
    en: {
      badge: 'Field Success Partnerships',
      title: 'Trusted by Leading Brands in the Kingdom',
      desc: 'Major suppliers and distributors utilize ProMeter for their promoter teams to track live field transactions and daily sales records.'
    },
    ar: {
      badge: 'شركاء النجاح الميداني',
      title: 'موثوقون لدى كبرى العلامات التجارية في المملكة',
      desc: 'يعتمد كبار الموردين والموزعين على Prometer لإدارة فرق الترويج لديهم وتتبع المعاملات الميدانية وسجلات المبيعات اليومية بشكل فوري.'
    }
  };

  public get currentText() {
    return this.languageService.currentLang === 'ar' ? this.text.ar : this.text.en;
  }

  constructor(private gsapService: GsapService, private languageService: LanguageService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      // Fade in the whole marquee group when it enters viewport
      const anim = gsap.fromTo(this.clientsSection.nativeElement,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: this.clientsSection.nativeElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onRefresh: (self) => {
              this.triggers.push(self);
            }
          }
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.triggers.forEach(trigger => {
      if (trigger) trigger.kill();
    });

    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.clientsSection.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
