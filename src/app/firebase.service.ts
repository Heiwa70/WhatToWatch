import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

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

  /**
   * Ajoute un document à une collection spécifiée dans la base de données Firestore.
   * @param collection - Le nom de la collection dans laquelle ajouter le document.
   * @param document - Le nom du document à ajouter.
   * @param data - Les données à enregistrer dans le document.
   */
  async addDocument(collection : string, document : string, data : any) {
    await setDoc(doc(this.db, collection, document), data);
  }

  /**
   * Récupère un document d'une collection spécifiée dans Firestore.
   * @param collection - Le nom de la collection.
   * @param document - L'ID du document à récupérer.
   * @returns Les données du document récupéré, ou null si le document n'existe pas.
   */
  async getDocument(collection : string, document : string) {
    const docRef = doc(this.db, collection, document);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  }

}