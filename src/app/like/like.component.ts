import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'firebase/auth';
import { Liste } from 'src/models/Liste';
import { Movie } from 'src/models/Movie/Movies';
import { PopularTv } from 'src/models/Tv/PopularTv';
import { Tv } from 'src/models/Tv/Tv';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
})
export class LikeComponent implements OnInit {
  heartClicked = false;
  @Input() item?: Movie | Tv;
  @Input() type?: string;
  userIsConnected: Boolean = false;
  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.userIsConnected = this.firebase.userIsConnected();
    this.updateListe();
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

updateListe() {
  if (this.item) {
    this.firebase
      .getListWhere(
        sessionStorage.getItem('email')!,
        'like',
        this.item.id.toString()
      )
      .then((doc: boolean | Liste) => {
        let liste: Liste = doc as Liste;

        if (liste.id.includes(this.item!.id)) {
          this.heartClicked = true;
        } else {
        }
      });
  }
}

  heartToggle() {
    this.heartClicked = !this.heartClicked;
    if (this.heartClicked) {
      const path = sessionStorage.getItem('email') + '/liste/like';
      this.firebase.getDocument('users', path).subscribe((doc) => {
        if (doc) {
          let id = doc.id || [];
          let type = doc.type || [];
          id.push(this.item?.id);
          type.push(this.type);
          this.firebase
            .updateDocument('users', path, { id: id, type: type })
            .then(() => {
            });
        } else {
          console.log('No such document!');
        }
      });
    } else {
      this.firebase.deleteItemList('like', this.item!.id).then(() => {
      });
    }
  }
}
