import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  document: string[] = [];
  showDiv: boolean = false;
  userIsConnected: boolean = false;
  friends: string[] = []; // Add this line
  searchValue: string = '';
  filteredFriends: string[] = [];

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.addFriend();
  }

  openList() {
    this.showDiv = !this.showDiv;
    if (this.showDiv) {
      this.firebase
      .getCollections('users')
      .subscribe((docs) => {
        docs.forEach((doc: any) => {
          this.document.push(doc.id);
        });
        console.log(this.document);
      });
    }
  }

  searchFriend(): void {
    if (this.searchValue) {
      this.filteredFriends = this.document.filter(friend =>
        friend.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      this.filteredFriends = [...this.document];
    }
  }

  addFriend(): void{
    console.log(`Adding`);
  }


  addItemToList(doc: string) {
    console.log(`Adding ${doc} to the list.`);
    // Add your logic here to add the item to the list
  }
}