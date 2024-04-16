import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { PopularTv } from 'src/models/Tv/PopularTv';
import { Tv } from 'src/models/Tv/Tv';

@Component({
  selector: 'app-card-series',
  templateUrl: './card-series.component.html',
  styleUrls: ['./card-series.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        flexGrow: '1',
        width: '400px', 
        opacity: 1,
      })),
      state('closed', style({
        flexGrow: '0',
        width: '0',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.5s', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 0.5 }),
          style({ width: '0', offset: 0.5 }),
        ]))
      ]),
      transition('closed => open', [
        animate('0.8s', keyframes([
          style({ width: '400px', offset: 0.5 }),
          style({ opacity: 1, offset: 1.0 }),
        ]))
      ]),
    ]),
  ]
})
export class CardSeriesComponent implements OnInit {

  @Input() series?: Tv ;
  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
  onListMenuOpen(open:boolean){
    this.isOpen = open;
  }

}
