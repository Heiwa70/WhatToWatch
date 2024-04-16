import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CollectionListe } from 'src/models/Liste';
import { Movie } from 'src/models/Movie/Movies';
import { Tv } from 'src/models/Tv/Tv';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-btn-list',
  templateUrl: './btn-list.component.html',
  styleUrls: ['./btn-list.component.css'],
})
export class BtnListComponent implements OnInit {
  userIsConnected: Boolean = false;
  showDiv: boolean = false;
  @Input() item?: Movie | Tv;
  @Input() type?: string;
  @Output() listMenuOpen = new EventEmitter<boolean>();
  document: string[] = [];

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.userIsConnected = this.firebase.userIsConnected();
    this.Setup();
  }

  Setup(){
    this.document = [];
    this.firebase
      .getCollections('users/' + sessionStorage.getItem('email') + '/liste')
      .subscribe((docs) => {
        docs.forEach((doc: CollectionListe) => {
          if (
            doc.id &&
            !doc.id.includes(this.item?.id!) &&
            doc.document
          ) {
            this.document.push(doc.document);
          }
        });
      console.log(this.document);

      });
  }

  openList() {
    this.showDiv = !this.showDiv;
    this.listMenuOpen.emit(this.showDiv);
  }

  addItemToList(doc: string) {
    const collectionPath =
      'users/' + sessionStorage.getItem('email') + '/liste';
    const docPath = doc;

    this.firebase.getDocument(collectionPath, docPath).subscribe((data) => {
      if (data) {
        const idArray = data.id || [];
        const typeArray = data.type || [];
        if (this.item?.id) {
          idArray.push(this.item.id);
        }
        if (this.type) {
          typeArray.push(this.type);
        }

        this.firebase
          .updateDocument(collectionPath, docPath, {
            id: idArray,
            type: typeArray,
          })
          .then(() => {
            console.log('Document successfully updated!');
            this.openList();
            this.Setup();
          });
      } else {
        console.log('No such document!');
      }
    });
  }
}
