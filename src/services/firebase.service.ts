import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  UserCredential,
  AuthError,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  deleteField,
} from 'firebase/firestore';
import { Users } from 'src/models/Users';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app: any;
  private analytics: any;
  private auth: any;
  private db: any;

  constructor(private router: Router) {
    const firebaseConfig = {
      apiKey: 'AIzaSyAG4PjJ7dvsSCQnciP3PrFiKO2eo8DZr6k',
      authDomain: 'whattowatch-1a9be.firebaseapp.com',
      projectId: 'whattowatch-1a9be',
      storageBucket: 'whattowatch-1a9be.appspot.com',
      messagingSenderId: '139337691226',
      appId: '1:139337691226:web:9425d0a6bba509c7f5e863',
      measurementId: 'G-G6DTLKV6DF',
    };

    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);

    this.auth = getAuth(this.app);

    this.db = getFirestore(this.app);
  }

  getApp() {
    return this.app;
  }

  getAnalytics() {
    return this.analytics;
  }

  getDb() {
    return this.db;
  }

  /**
   * Ajoute un document à une collection spécifiée dans la base de données Firestore.
   * @param collection - Le nom de la collection dans laquelle ajouter le document.
   * @param document - Le nom du document à ajouter.
   * @param data - Les données à enregistrer dans le document.
   */
  async addDocument(collection: string, document: string, data: any) {
    await setDoc(doc(this.db, collection, document), data);
  }

  /**
   * Récupère un document d'une collection spécifiée dans Firestore.
   * @param collection - Le nom de la collection.
   * @param document - L'ID du document à récupérer.
   * @returns Les données du document récupéré, ou null si le document n'existe pas.
   */
  async getDocument(collection: string, document: string) {
    const docRef = doc(this.db, collection, document);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  }

  /**
   * Supprime un document d'une collection dans la base de données Firestore.
   * @param collection - Le nom de la collection.
   * @param document - L'ID du document à supprimer.
   */
  async deleteDocument(collection: string, document: string) {
    await deleteDoc(doc(this.db, collection, document));
  }

  async deleteChamp(collection: string, document: string, champ: string) {
    const docRef = doc(this.db, collection, document);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        champ: deleteField(),
      });
    } else {
      console.log('No such document!');
    }
  }

  /**
   * Crée un nouvel utilisateur avec l'email et le mot de passe spécifiés.
   *
   * @param email - L'email de l'utilisateur.
   * @param password - Le mot de passe de l'utilisateur.
   * @returns Un booléen indiquant si la création de l'utilisateur a réussi.
   */
  async createUser(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * Connecte un utilisateur avec l'email et le mot de passe fournis.
   *
   * @param email - L'email de l'utilisateur.
   * @param password - Le mot de passe de l'utilisateur.
   * @returns Une promesse qui se résout en une chaîne de caractères représentant le jeton JWT.
   * @throws Une erreur s'il y a un problème avec le processus de connexion.
   */
  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<string> {
    try {
      const auth = getAuth(); // Récupérer l'objet d'authentification
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log('Utilisateur connecté:', user);

      // Récupérer le token JWT de l'utilisateur
      const idToken = await user.getIdToken();

      // Stocker le token JWT dans le stockage local du navigateur
      sessionStorage.setItem('token', idToken);
      console.log('Token JWT:', idToken);
      console.log(sessionStorage.getItem('token'));

      return idToken; // Retourner le token JWT
    } catch (error: any) {
      const errorCode = (error as AuthError).code;
      const errorMessage = (error as AuthError).message;
      console.error('Erreur lors de la connexion:', errorMessage);
      throw error;
    }
  }

  /**
   * Récupère le token de l'utilisateur actuellement connecté.
   * @returns L'utilisateur actuellement connecté, ou false s'il n'y a pas d'utilisateur connecté.
   */
  userIsConnected(): Users | Boolean {
    var token = sessionStorage.getItem('token');
    if (token != null) {
      // Un utilisateur est connecté
      return true;
    } else {
      // Aucun utilisateur n'est connecté
      return false;
    }
  }

  /**
   * Déconnecte l'utilisateur.
   * @returns {any} Une promesse qui se résout lorsque l'utilisateur est déconnecté avec succès.
   */
  logOut(): any {
    signOut(this.auth)
      .then(() => {
        sessionStorage.removeItem('token');
        this.router.navigate(['/']);

        // Sign-out successful.
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Récupère les informations de l'utilisateur à partir de l'objet utilisateur fourni.
   * @param user - L'objet utilisateur.
   * @returns Les informations de l'utilisateur sous forme d'objet Users.
   */
  getUser(user: any): Users {
    var modelUser: Users = {
      providerId: user.providerId,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    return modelUser;
  }

  /**
   * Redirige l'utilisateur vers la page d'accueil.
   */
  returnHome() {
    this.router.navigate(['/']);
  }

}
