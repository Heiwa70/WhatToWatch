import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';
import { Movie } from 'src/models/Movie/Movies';
import { PopularTv } from 'src/models/Tv/PopularTv';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
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
export class ListCardComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Input() title: string = '';
  @Output() toggleCard = new EventEmitter<number>();


  @ViewChild('carousel', { static: false }) carousel?: ElementRef;

  cards: Movie[] = [];
  currentCardIndex = 0;
  cardWidth = 300;

  isOpen: boolean[] = [];

  isAnimating: boolean = false;


  constructor() { }

  ngOnInit(): void {

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies']) {
      this.cards = [...changes['movies'].currentValue];
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
