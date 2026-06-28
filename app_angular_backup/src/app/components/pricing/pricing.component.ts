import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapService } from '../../services/gsap.service';

interface PlanItem {
  name: string;
  users: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular: boolean;
  features: string[];
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, OnDestroy {
  @ViewChild('pricingSection', { static: true }) pricingSection!: ElementRef<HTMLElement>;

  public yearlyMode = false;
  private triggers: any[] = [];

  // Pricing plans in English
  public plans: PlanItem[] = [
    {
      name: 'Starter Plan',
      users: 'Up to 10 field promoters',
      monthlyPrice: 299,
      yearlyPrice: 239,
      isPopular: false,
      features: [
        'GPS tracking and check-ins',
        'Daily attendance verification',
        'Basic sales performance reports',
        '5GB secure cloud storage'
      ]
    },
    {
      name: 'Growth Plan',
      users: 'Up to 30 field promoters',
      monthlyPrice: 799,
      yearlyPrice: 639,
      isPopular: true,
      features: [
        'All Starter plan features',
        'Shelf inventory audits and logs',
        'Dedicated supervisor dashboards',
        'Auto commission calculation',
        '25GB secure cloud storage'
      ]
    },
    {
      name: 'Professional Plan',
      users: 'Up to 100 field promoters',
      monthlyPrice: 1499,
      yearlyPrice: 1199,
      isPopular: false,
      features: [
        'All Growth plan features',
        'Intelligent route sequence mapping',
        'Live sales targets sync',
        'Custom report exports',
        '24/7 priority support lines'
      ]
    },
    {
      name: 'Enterprise Plan',
      users: 'Above 100 field promoters',
      monthlyPrice: 0,
      yearlyPrice: 0,
      isPopular: false,
      features: [
        'Unlimited field promoters',
        'Dedicated secure cloud hosting',
        'Direct API integration with ERP systems',
        'Custom feature developments',
        'Guaranteed service SLA contract'
      ]
    }
  ];

  constructor(private gsapService: GsapService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.pricingSection.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
