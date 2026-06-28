import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GsapService } from '../../services/gsap.service';

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

  // Info items in English
  public info = [
    { label: 'Direct Phone', val: '+966 56 980 9566', color: '#CAE3DE' },
    { label: 'Official Email', val: 'info@prometer.sa', color: '#CAE3DE' },
    { label: 'Headquarters', val: 'Riyadh, Saudi Arabia', color: '#CAE3DE' },
    { label: 'Support Hours', val: 'Sat - Thu (9:00 AM - 6:00 PM)', color: '#CAE3DE' }
  ];

  constructor(private gsapService: GsapService) {}

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
