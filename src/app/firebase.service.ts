import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: any;
  private analytics: any;
  private db: any;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAG4PjJ7dvsSCQnciP3PrFiKO2eo8DZr6k",
      authDomain: "whattowatch-1a9be.firebaseapp.com",
      projectId: "whattowatch-1a9be",
      storageBucket: "whattowatch-1a9be.appspot.com",
      messagingSenderId: "139337691226",
      appId: "1:139337691226:web:9425d0a6bba509c7f5e863",
      measurementId: "G-G6DTLKV6DF"
    };

    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);

    this.db = getFirestore(this.app);
  }

  getApp() {
    return this.app;
  }

  getAnalytics() {
    return this.analytics;
  }

  getDb(){
    return this.db;
  }

  async addDocument(collection : string, document : string, data : any) {
    await setDoc(doc(this.db, collection, document), data);
  }

}