import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Peoples, PeoplesResponse } from 'src/models/People/People';
import { Person } from 'src/models/People/PeopleDetails';
import { TmdbService } from 'src/services/tmdb.service';
import { TruncatePipe } from '../Pipes/biography';


@Component({
  selector: 'app-card-personne',
  templateUrl: './card-personne.component.html',
  styleUrls: ['./card-personne.component.css'],
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
export class CardPersonneComponent implements OnInit {
  personneDetails?: Person;

  @Input() personne?: Peoples ;
  isOpen = false;

  constructor(private api: TmdbService) { }

  ngOnInit(): void {

    this.api.getDetailsPeople(this.personne?.id.toString() as string).subscribe(
      (data: Person) => {
        this.personneDetails = data;
      },
      error => {
        console.error('Erreur lors de la récupération des personnes populaires : ', error);
      }
    );
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
