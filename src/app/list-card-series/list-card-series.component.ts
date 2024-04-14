import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Tv } from 'src/models/Tv/Tv';

@Component({
  selector: 'app-list-card-series',
  templateUrl: './list-card-series.component.html',
  styleUrls: ['./list-card-series.component.css'],
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
export class ListCardSeriesComponent implements OnInit {

  @Input() series: Tv[] = [];
  @Input() title: string = '';
  @Output() toggleCard = new EventEmitter<number>();

  @ViewChild('carousel', { static: false }) carousel?: ElementRef;

  cards: Tv[] = [];
  currentCardIndex = 0;
  cardWidth = 300;

  isOpen: boolean[] = [];

  isAnimating: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series']) {
      this.cards = [...changes['series'].currentValue];
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
