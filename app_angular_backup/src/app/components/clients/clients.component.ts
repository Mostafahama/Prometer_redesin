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
    { dirClass: 'animate-marquee-ltr', brands: ['1brand.webp', '2brand.webp', '3brand.webp', '4brand.webp'] },
    { dirClass: 'animate-marquee-rtl', brands: ['5brand.webp', '6brand.webp', '7brand.webp', '8brand.webp'] },
    { dirClass: 'animate-marquee-ltr', brands: ['9brand.webp', '10brand.webp', '11brand.webp', '1brand.webp'] },
    { dirClass: 'animate-marquee-rtl', brands: ['2brand.webp', '3brand.webp', '4brand.webp', '5brand.webp'] }
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
