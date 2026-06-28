import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  private triggers: any[] = [];

  public traditional = [
    { text: 'Chaotic WhatsApp Groups' },
    { text: 'Scattered & Delayed Excel Sheets' },
    { text: 'Slow, Late Email Summaries' },
    { text: 'Manual Phone Tracking' },
    { text: 'Delayed Operations Decisions' },
    { text: 'No Live Field Operations Visibility' },
    { text: 'Difficult Sales KPIs Monitoring' },
    { text: 'Higher Operations Supervision Cost' }
  ];

  public prometer = [
    { text: 'One Centralized Platform' },
    { text: 'Real-Time Interactive Dashboard' },
    { text: 'Instant Automated Sales Reports' },
    { text: 'Verified GPS Biometric Proof' },
    { text: 'Live Representative Performance Logs' },
    { text: 'Instant Alerts & Notifications' },
    { text: 'Centralized Operations Workspace' },
    { text: 'Fact-Based Instant Decisions' }
  ];

  constructor(private gsapService: GsapService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      const cards = this.sectionRef.nativeElement.querySelectorAll('.rounded-2xl');

      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: this.sectionRef.nativeElement,
              start: 'top 75%',
              toggleActions: 'play none none none',
              onRefresh: (self) => {
                this.triggers.push(self);
              }
            }
          }
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
        if (trigger.vars.trigger && this.sectionRef.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
