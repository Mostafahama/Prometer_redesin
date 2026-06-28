import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public mobileMenuOpen = false;

  // English nav links
  public navLinks = [
    { label: 'Home', anchor: '#hero' },
    { label: 'Comparison', anchor: '#why-us' },
    { label: 'Ecosystem', anchor: '#ecosystem' },
    { label: 'Interfaces', anchor: '#experience' },
    { label: 'Pricing', anchor: '#pricing' },
    { label: 'Contact', anchor: '#contact' }
  ];

  constructor() {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  public scrollToSection(anchor: string): void {
    this.mobileMenuOpen = false;
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
