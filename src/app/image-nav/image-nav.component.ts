import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-image-nav',
  imports: [CommonModule],
  templateUrl: './image-nav.component.html',
  styleUrl: './image-nav.component.css'
})
export class ImageNavComponent {
  
  @ViewChild('slide') slideRef!: ElementRef;
  private intervalId: any;
  private readonly slideInterval = 3000;
  
  images = [
    {
      src: 'assets/images/image_1.webp',
      alt: 'Switzerland',
      name: 'Switzerland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, impedit?'
    },
    {
      src: 'assets/images/image_2.webp',
      alt: 'Finland',
      name: 'Finland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, impedit?'
    },
    {
      src: 'assets/images/image_3.webp',
      alt: 'Iceland',
      name: 'Iceland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, impedit?'
    },
    {
      src: 'assets/images/image_4.webp',
      alt: 'Australia',
      name: 'Australia',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, impedit?'
    },
    {
      src: 'assets/images/image_5.jpg',
      alt: 'Netherland',
      name: 'Netherland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, impedit?'
    },
    {
      src: 'assets/images/image_6.jpg',
      alt: 'Ireland',
      name: 'Ireland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, impedit?'
    }
  ];
  ngOnInit(): void {
    this.startAutoSlide();
  }

  private startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, this.slideInterval);
  }


  next(): void {
    const items = this.slideRef.nativeElement.children;
    this.slideRef.nativeElement.appendChild(items[0]);
  }

  prev(): void {
    const items = this.slideRef.nativeElement.children;
    this.slideRef.nativeElement.insertBefore(items[items.length - 1], items[0]);
  }
}