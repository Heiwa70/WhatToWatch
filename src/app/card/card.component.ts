import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie/Movies';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { PopularTv } from 'src/models/Tv/PopularTv';
import { FirebaseService } from 'src/services/firebase.service';
import { Liste } from 'src/models/Liste';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          flexGrow: '1',
          width: '400px',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          flexGrow: '0',
          width: '0',
          opacity: 0,
        })
      ),
      transition('open => closed', [
        animate(
          '0.5s',
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, offset: 0.5 }),
            style({ width: '0', offset: 0.5 }),
          ])
        ),
      ]),
      transition('closed => open', [
        animate(
          '0.8s',
          keyframes([
            style({ width: '400px', offset: 0.5 }),
            style({ opacity: 1, offset: 1.0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CardComponent implements OnInit {
  @Input() movie?: Movie | PopularTv;
  isOpen = false;
  heartClicked = false;

  constructor(private firebase: FirebaseService) {}

ngOnInit(): void {
  this.firebase.getListWhere(sessionStorage.getItem('email')!, 'like', this.movie!.id.toString())
    .then((doc: boolean | Liste) => {
      let liste: Liste = doc as Liste;
      console.log(' liste id = '+liste.id);
      if(liste.id.includes(this.movie!.id)){
        this.heartClicked = true;
      }
      else{
        console.log(false);
      }
    });
}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  heartToggle() {
    this.heartClicked = !this.heartClicked;
    if (this.heartClicked) {
      const path = sessionStorage.getItem('email') + '/liste/like';
      this.firebase.getDocument('users', path).subscribe((doc) => {
        if (doc) {
          let id = doc.id || [];
          let type = doc.type || [];
          id.push(this.movie?.id);
          type.push('movie');
          this.firebase.updateDocument('users', path, { id: id, type: type });
        } else {
          console.log('No such document!');
        }
      });
      console.log('heart clicked : ' + this.movie?.id);
      console.log('email : ' + sessionStorage.getItem('email'));
    } else {
      console.log('heart unclicked');
      this.firebase.deleteItemList('like', this.movie!.id);
      
    }
  }
}
