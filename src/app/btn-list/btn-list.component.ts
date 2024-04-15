import { Component, Input, OnInit } from '@angular/core';
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
  showDiv: Boolean = false;
  @Input() item?: Movie | Tv;
  document: string[] = [];

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.userIsConnected = this.firebase.userIsConnected();
    this.firebase
      .getCollections('users/' + sessionStorage.getItem('email') + '/liste')
      .subscribe((docs) => {
        docs.forEach((doc: any) => {
          console.log(doc.document); // Ici, doc.id est le nom du document
          this.document.push(doc.document);
         


        });
      });
  }

  openList() {
    this.showDiv = !this.showDiv;

}
}
