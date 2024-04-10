import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Movie } from 'src/models/Movie/Movies';

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

  @ViewChild('carousel', { static: false }) carousel?: ElementRef;

  cards: string[] = [];
  currentCardIndex = 0;
  cardWidth = 300;
  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'] && changes['movies'].currentValue) {
      console.log(this.movies);
      for (let i = 0; i < this.movies.length; i++) {
        this.cards.push(this.movies[i].poster_path);
      }
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
