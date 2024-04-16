import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css'],
})
export class NewListComponent implements OnInit {
  nameList: string = '';
  form: FormGroup;
  constructor(private firebase: FirebaseService, private route: Router) {
    this.form = new FormGroup({
      name: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  onSubmit() {


     this.firebase
      .addDocument(
        'users',
        sessionStorage.getItem('email') + '/liste/' + this.form.value.name,
        { document: this.form.value.name, id: [], type: [] }
      )
      .then(() => {
        console.log('Document successfully written!');
        this.form.reset();
        this.route.navigate(['/Lists']);
      });
  }
}
