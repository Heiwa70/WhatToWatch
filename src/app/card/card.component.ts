import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() poster_path: string ;

  constructor() {
    this.poster_path = '';
  }

  ngOnInit(): void {
  }

}
