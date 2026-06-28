import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';

interface FeatureItem {
  text: string;
}

interface ViewItem {
  id: string;
  label: string;
  desc: string;
  image: string;
  features: FeatureItem[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('imageContainer', { static: false }) imageContainer!: ElementRef<HTMLDivElement>;

  public activeIndex = 0;
  public transitioning = false;
  public mouseX = 0;
  public mouseY = 0;

  private triggers: any[] = [];

  // Standalone component views translated to English with screenshots paths
  public views: ViewItem[] = [
    {
      id: 'admin',
      label: 'Administrator Dashboard',
      desc: 'Complete command center for managers and executives to supervise all field sales activities, regions, and representative metrics.',
      image: '/images/experience-admin.png',
      features: [
        { text: 'Live sell-out performance logging across all pharmacy counters' },
        { text: 'Dynamic GPS map listing all active promoter positions' },
        { text: 'Unified client database with visit histories and display reviews' },
        { text: 'Executive reports and charts built for executive decisions' },
        { text: 'Automated warnings for geofence breaches or route delays' }
      ]
    },
    {
      id: 'supervisor',
      label: 'Supervisor Workspace',
      desc: 'Dedicated oversight dashboard designed for field supervisors to verify daily promoter visits, attendance, and coach teams.',
      image: '/images/experience-supervisor.png',
      features: [
        { text: 'Track real-time promoter team visits and sales achievement' },
        { text: 'Verify visit coordinates via geofenced GPS check-in reports' },
        { text: 'Audit daily biometric check-ins and total working hours' },
        { text: 'Compare active field sales performance vs target margins' },
        { text: 'Direct messaging and quick coaching tips to underperforming reps' }
      ]
    },
    {
      id: 'employee',
      label: 'Promoter Mobile App',
      desc: 'Mobile application designed for promoters to record sales, log display compliance, check-in, and review monthly commission achievements.',
      image: '/images/experience-mobile.png',
      features: [
        { text: 'Geofenced GPS attendance clock-in with selfie confirmation' },
        { text: 'Log counter visits with image uploads for shelf compliance' },
        { text: 'Register order sheets and cash/credit collections in real time' },
        { text: 'Track monthly target achievements and pending commissions' },
        { text: 'Access optimized route sequences to prevent time loss in transit' }
      ]
    }
  ];

  constructor(private gsapService: GsapService) {}

  ngOnInit(): void {}

  public changeTab(index: number): void {
    if (index === this.activeIndex || this.transitioning) return;
    this.transitioning = true;
    setTimeout(() => {
      this.activeIndex = index;
      this.transitioning = false;
    }, 250);
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(e: MouseEvent): void {
    if (!this.imageContainer) return;
    const rect = this.imageContainer.nativeElement.getBoundingClientRect();
    if (!rect) return;
    
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    this.mouseX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
    this.mouseY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
  }

  ngOnDestroy(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.sectionRef.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
