import { Component } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { FirebaseService } from './controllers/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WhatToWatch';

  constructor(private firebaseService: FirebaseService) {}
}
