import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GsapService } from '../../services/gsap.service';

@Component({
  selector: 'app-roi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roi.component.html',
  styleUrls: ['./roi.component.scss']
})
export class RoiComponent implements OnInit, OnDestroy {
  @ViewChild('roiSection', { static: true }) roiSection!: ElementRef<HTMLElement>;

  // Input Slider Models
  public employees = 25;
  public supervisors = 5;
  public branches = 3;
  public visits = 20;
  public salary = 5000;

  private triggers: any[] = [];

  constructor(private gsapService: GsapService) {}

  ngOnInit(): void {}

  // Recalculated outputs bound in real-time
  get productivityGain(): number {
    return Math.round(Math.min(45 + this.employees * 0.4, 85));
  }

  get timeSaved(): number {
    return Math.round(Math.min(30 + this.supervisors * 2 + this.branches * 1.5, 75));
  }

  get complianceGain(): number {
    return Math.round(Math.min(60 + this.visits * 0.3, 95));
  }

  get annualValue(): number {
    return Math.round(
      (this.employees * this.salary * 12 * (this.productivityGain / 100) * 0.15) + 
      (this.supervisors * 3000 * 12 * (this.timeSaved / 100) * 0.2)
    );
  }

  // Linear gradient fill calculations for range sliders (Tailwind inline styling helper)
  public getSliderProgress(val: number, min: number, max: number): string {
    const percentage = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to left, #A537FB ${percentage}%, rgba(202, 227, 222, 0.1) ${percentage}%)`;
  }

  ngOnDestroy(): void {
    this.gsapService.run((gsap, ScrollTrigger) => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && this.roiSection.nativeElement.contains(trigger.vars.trigger as Element)) {
          trigger.kill();
        }
      });
    });
  }
}
