import { Injectable } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(firebase: FirebaseService) { }

  AddLike(){
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
  }
}
