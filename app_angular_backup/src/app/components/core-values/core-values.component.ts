import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';

@Component({
  selector: 'app-core-values',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core-values.component.html',
  styleUrls: ['./core-values.component.scss']
})
export class CoreValuesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('valuesSection', { static: true }) valuesSection!: ElementRef<HTMLElement>;

  private triggers: any[] = [];

  public values = [
    {
      title: 'Clarity',
      desc: 'Full transparency in tracking promoter sales activities and daily display audits without any clutter.'
    },
    {
      title: 'Precision',
      desc: 'Geofenced GPS and real-time verification to prevent data manipulation and prove promoter presence.'
    },
    {
      title: 'Balanced Control',
      desc: 'Flexible team oversight balancing operational discipline with promoter empowerment.'
    },
    {
      title: 'Smart Forecast',
      desc: 'Analyzing purchase behaviors and counter inventory to predict demand and avoid out-of-stock scenarios.'
    },
    {
      title: 'Discipline',
      desc: 'Total adherence to schedule routes and visit plans ensuring comprehensive brand presence across counters.'
    }
  ];

  constructor(private gsapService: GsapService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      const items = this.valuesSection.nativeElement.querySelectorAll('.value-item');
      const logo = this.valuesSection.nativeElement.querySelector('.anim-logo');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.valuesSection.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onRefresh: (self) => {
            this.triggers.push(self);
          }
        }
      });

      if (logo) {
        tl.fromTo(logo,
          { opacity: 0, scale: 0.5, rotation: -90 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
        );
      }

      if (items.length) {
        tl.fromTo(items,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
          '-=0.5'
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.triggers.forEach(trigger => {
      if (trigger) trigger.kill();
    });
    
    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.valuesSection.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
