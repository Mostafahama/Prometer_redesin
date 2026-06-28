import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';

@Component({
  selector: 'app-pillars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pillars.component.html',
  styleUrls: ['./pillars.component.scss']
})
export class PillarsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pillarsContainer', { static: true }) pillarsContainer!: ElementRef<HTMLDivElement>;

  private triggers: any[] = [];

  // Card items matching user requirements exactly in English
  public cards = [
    {
      bgClass: 'bg-prometer-neon text-white shadow-neon',
      accentText: 'Systematic & Clear',
      text: 'Systematic & Transparent Performance',
      description: 'Say goodbye to chaos and manual follow-ups. Smart software solutions ensure organizing and documenting promoter performance in retail outlets in real-time.'
    },
    {
      bgClass: 'bg-prometer-dark border border-prometer-mint/10 text-prometer-mint shadow-glass hover:border-prometer-neon/50',
      accentText: 'Data Credibility',
      text: 'Data Truth for Correct Decisions',
      description: 'Live tracking via interactive maps and attendance verification using biometric GPS proof and photos to guarantee the credibility of every field sales report.'
    },
    {
      bgClass: 'bg-prometer-mint text-prometer-dark shadow-lg',
      accentText: 'Organizing Field Sales',
      text: 'Organizing Beauty & Cosmetics Field Teams',
      description: 'Full customization for promoter targets, commission tracking, and stock audits for global and local brands in the Middle Eastern beauty sector.'
    }
  ];

  constructor(private gsapService: GsapService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      const cardsElements = this.pillarsContainer.nativeElement.querySelectorAll('.pillar-card');

      cardsElements.forEach((card, index) => {
        const anim = gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 100, 
            rotation: index % 2 === 0 ? -5 : 5 
          },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
              onRefresh: (self) => {
                this.triggers.push(self);
              }
            }
          }
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.triggers.forEach(trigger => {
      if (trigger) trigger.kill();
    });
    
    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.pillarsContainer.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
