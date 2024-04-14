import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Peoples } from 'src/models/People/People';


@Component({
  selector: 'app-list-card-personne',
  templateUrl: './list-card-personne.component.html',
  styleUrls: ['./list-card-personne.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ListCardPersonneComponent implements OnInit {
  @Input() personne: Peoples[] = [];
  @Input() title: string = '';
  @Output() toggleCard = new EventEmitter<number>();

  @ViewChild('carousel', { static: false }) carousel?: ElementRef;

  cards: Peoples[] = [];
  currentCardIndex = 0;
  cardWidth = 300;

  isOpen: boolean[] = [];

  isAnimating: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personne']) {
      this.cards = [...changes['personne'].currentValue];
    }
  }

  onAnimationEvent(event: AnimationEvent) {
    if (event.phaseName === 'done') {
      this.isAnimating = false;
    }
  }


  nextCard() {
    if (this.carousel && this.carousel.nativeElement) {
      const newScrollPosition = this.carousel.nativeElement.scrollLeft + this.cardWidth;
      this.carousel.nativeElement.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  }

  previousCard() {
    if (this.carousel && this.carousel.nativeElement) {
      const newScrollPosition = this.carousel.nativeElement.scrollLeft - this.cardWidth;
      this.carousel.nativeElement.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  }  
}
