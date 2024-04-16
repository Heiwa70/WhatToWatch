import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CollectionListe, Liste } from 'src/models/Liste';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-menu-verticale',
  templateUrl: './menu-verticale.component.html',
  styleUrls: ['./menu-verticale.component.css'],
})
export class MenuVerticaleComponent implements OnInit {
  showMenuList = false;
  document: CollectionListe[] = [];
  userIsConnected: Boolean = false;
  @Output() liste: EventEmitter<CollectionListe> =
    new EventEmitter<CollectionListe>();
  @Output() title: EventEmitter<string> = new EventEmitter<string>();
  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.userIsConnected = this.firebase.userIsConnected();
    this.Setup();
  }

  Setup() {
    this.document = [];
    this.firebase
      .getCollections('users/' + sessionStorage.getItem('email') + '/liste')
      .subscribe((docs) => {
        docs.forEach((doc: any) => {
          if (doc.document && doc.document.trim() !== '') {
            const newCollectionListe: CollectionListe = {
              document: doc.document,
              type: doc.type || [],
              id: doc.id || [],
            };
            this.document.push(newCollectionListe);
          }
        });
      });
  }

  Update() {
    this.firebase
      .getCollections('users/' + sessionStorage.getItem('email') + '/liste')
      .subscribe((docs) => {
        docs.forEach((doc: any) => {
          const existingDoc = this.document.find((d) => d.id === doc.id);
          if (existingDoc) {
            existingDoc.document = doc.document;
            existingDoc.type = doc.type || [];
          } else if (doc.document && doc.document.trim() !== '') {
            const newCollectionListe: CollectionListe = {
              document: doc.document,
              type: doc.type || [],
              id: doc.id || [],
            };
            this.document.push(newCollectionListe);
          }
        });

        this.document = this.document.filter((doc) =>
          docs.find((d: CollectionListe) => d.id === doc.id)
        );
      });
  }

  emitListe(liste: CollectionListe) {
    //this.Setup();
    this.Update();
    this.liste.emit(liste);
  }

  emitTitle(title: string) {
    this.title.emit(title);
  }

  deleteListe(liste: CollectionListe) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette liste ?')) {
      this.firebase
        .deleteDocument(
          'users/' + sessionStorage.getItem('email') + '/liste',
          liste.document
        )
        .then(() => {
          const index = this.document.indexOf(liste);
          if (index > -1) {
            this.document.splice(index, 1);
          }
        });
    } else {
    }
  }
}
