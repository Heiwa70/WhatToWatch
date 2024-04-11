import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TopRatingTv } from 'src/models/Tv/TopRatingTv';

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

  @Input() series: TopRatingTv[] = [];
  @Input() title: string = '';
  @Output() toggleCard = new EventEmitter<number>();

  @ViewChild('carousel', { static: false }) carousel?: ElementRef;

  cards: TopRatingTv[] = [];
  currentCardIndex = 0;
  cardWidth = 300;

  isOpen: boolean[] = [];

  isAnimating: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateCards('series', changes);
  }


  updateCards(property: string, changes: SimpleChanges): void {
    if (changes[property] && changes[property].currentValue) {
      console.log((this as any)[property]);
      for (let i = 0; i < (this as any)[property].length; i++) {
        this.cards.push((this as any)[property][i]);
      }
      console.log("card = ");
      console.log(this.cards);
    }
  }

  toggle(i: number, open: boolean) {
    // Only trigger a new animation if no animation is currently running
    if (!this.isAnimating) {
      // Close all cards
      for (let j = 0; j < this.isOpen.length; j++) {
        this.isOpen[j] = false;
      }
  
      // Open the card the user hovered over
      if (open) {
        this.isOpen[i] = true;
      }
  
      // Set isAnimating to true
      this.isAnimating = true;
    }
  }

  onAnimationEvent(event: AnimationEvent) {
    // Set isAnimating to false when the animation is done
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
