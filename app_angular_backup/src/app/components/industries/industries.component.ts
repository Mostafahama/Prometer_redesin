import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';

interface IndustryItem {
  title: string;
  desc: string;
  color: string;
  isCosmetics: boolean; // Highlight cosmetics industries as per prompt guidelines
  svgPath: string;
}

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('industriesSection', { static: true }) industriesSection!: ElementRef<HTMLElement>;
  @ViewChild('gridRef', { static: true }) gridRef!: ElementRef<HTMLDivElement>;

  private triggers: any[] = [];

  // Industries list translated to English, highlighting the primary cosmetics sectors
  public industries: IndustryItem[] = [
    {
      title: 'Beauty & Perfumes',
      desc: 'Track and manage beauty advisor performance, check display inventory, and highlight best-selling products.',
      color: '#CAE3DE',
      isCosmetics: true,
      svgPath: 'M9.813 15.904L9 21m0 0l-.813-5.096m.813 5.096V10M6 13h6M5 7h8a2 2 0 012 2v2H3V9a2 2 0 012-2z'
    },
    {
      title: 'Skincare & Derma',
      desc: 'Monitor medical beauty advisors and sales metrics in leading pharmacies and skincare clinics.',
      color: '#CAE3DE',
      isCosmetics: true,
      svgPath: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
    },
    {
      title: 'Pharma & Pharmacy',
      desc: 'Supervise medical representative visits, sample distribution, and pharmaceutical shelf availability.',
      color: '#CAE3DE',
      isCosmetics: false,
      svgPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z'
    },
    {
      title: 'Consumer Goods (FMCG)',
      desc: 'Optimize route scheduling, record shelf space ratios, and trace product availability instantly.',
      color: '#CAE3DE',
      isCosmetics: false,
      svgPath: 'M20.25 7.5 12 12 3.75 7.5M12 12v9m-8.25-13.5v9a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25v-9'
    },
    {
      title: 'Large Format Retail',
      desc: 'Monitor counter sales, check brand display compliance, and track promoter attendance in malls.',
      color: '#CAE3DE',
      isCosmetics: false,
      svgPath: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
    }
  ];

  constructor(private gsapService: GsapService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      const cards = this.gridRef.nativeElement.querySelectorAll('.industry-card');

      const anim = gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: this.gridRef.nativeElement,
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
        if (trigger.vars.trigger && this.industriesSection.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
