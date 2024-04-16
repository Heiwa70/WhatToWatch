import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {
  document: string[] = [];
  showDiv: boolean = false;
  userIsConnected: boolean = false;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.firebase
      .getCollections('users')
      .subscribe((docs) => {
        docs.forEach((doc: any) => {
          this.document.push(doc.id);
        });
        console.log(this.document);
      });
  }

  openList() {
    this.showDiv = !this.showDiv;
    console.log('Opening list');
  }

  // Add this method
  addItemToList(doc: string) {
    // Add your logic here to add the item to the list
    console.log(`Adding ${doc} to the list.`);
  }

}
