import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [CommonModule],
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FooterComponent {
  // Data for the footer links
  sections = [
    {
      title: 'Terms and Policies',
      links: [
        { text: 'Privacy Policy', url: '#' },
        { text: 'Hyperlink Policy', url: '#' },
        { text: 'Website Policies', url: '#' },
        { text: 'Content Policies', url: '#' },
        { text: 'Contingency Plan', url: '#' }
      ]
    },
    {
      title: 'About',
      links: [
        { text: 'About Us', url: '#' },
        { text: 'Sitemap', url: '#' },
        { text: 'Terms of Use', url: '#' },
        { text: 'MoRTH', url: '#' },
        { text: 'CMVR 1989', url: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Fees and User Charges', url: '#' },
        { text: 'Act, Rules and Policies', url: '#' },
        { text: 'Permit Fees and Period', url: '#' },
        { text: 'Manual', url: '#' },
        { text: 'Homologation', url: '#' }
      ]
    },
    {
      title: 'Need Help',
      links: [
        { text: 'Contact Us', url: '#' },
        { text: 'Frequently Asked Questions', url: '#' },
        { text: 'Raise a concern', url: '#' },
        { text: 'Calendar', url: '#' },
        { text: 'Web Information Manager', url: '#' }
      ]
    }
  ];

  // Current date for the footer
  currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');
}