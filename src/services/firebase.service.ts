import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  WhereFilterOp,
  getFirestore,
  where,
  query,
  getDocs,
  collection,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  UserCredential,
  AuthError,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
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
import { Observable, map, from } from 'rxjs';
import { Router } from '@angular/router';
import { Liste } from 'src/models/Liste';

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

  getAuth() {
    return this.auth;
  }

  /**
   * Ajoute un document à une collection spécifiée dans la base de données Firestore.
   * @param collection - Le nom de la collection dans laquelle ajouter le document.
   * @param path - Chemin du document.
   * @param data - Les données à enregistrer dans le document.
   */
  async addDocument(collection: string, path: string, data: any) {
    await setDoc(doc(this.db, collection, path), data);
  }

  /**
   * Récupère un document d'une collection spécifiée dans Firestore.
   * @param collection - Le nom de la collection.
   * @param document - L'ID du document à récupérer.
   * @returns Les données du document récupéré, ou null si le document n'existe pas.
   */
  getDocument(collectionPath: string, docPath: string): Observable<any> {
    const docRef = doc(this.db, collectionPath, docPath);

    return from(getDoc(docRef)).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return docSnapshot.data();
        } else {
          console.log('No document found!');
          return null;
        }
      })
    );
  }


 async getListWhere(identifiants: string, liste: string, id: string): Promise<boolean | Liste> {
  const userDocRef = doc(this.db, 'users', identifiants);
  const listeCollectionRef = collection(userDocRef, 'liste');
  const likeDocRef = doc(listeCollectionRef, liste);

  const docSnapshot = await getDoc(likeDocRef);
  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    const liste: Liste = {
      id: data['id'],
      type: data['type']
    };
    return liste;
  } else {
    console.log('Document does not exist');
    return false;
  }
}

  async updateDocument(collection: string, document: string, data: any) {
    const docRef = doc(this.db, collection, document);
    await updateDoc(docRef, data);
  }

  /**
   * Supprime un document d'une collection dans la base de données Firestore.
   * @param collection - Le nom de la collection.
   * @param document - L'ID du document à supprimer.
   */
  async deleteDocument(collection: string, document: string) {
    await deleteDoc(doc(this.db, collection, document));
  }

  async deleteItemList( liste: string, id: number) {
  const docRef = doc(this.db, 'users', sessionStorage.getItem('email')!, 'liste', liste);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const champId = data?.['id'];
    const champType = data?.['type'];

    if (champId && champType) {
      const index = champId.indexOf(id);

      if (index > -1) {
        champId.splice(index, 1);
        champType.splice(index, 1);
        await updateDoc(docRef, { ['id']: champId, ['type']: champType });
      }
    }
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

      // Stocker le token JWT et l'email dans le stockage local du navigateur
      sessionStorage.setItem('token', idToken);
      sessionStorage.setItem('email', email); // Evite d'intéragir avec la base de données pour récupérer l'email
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

  modificationApply(): Users | Boolean {
    var token = sessionStorage.getItem('token');
    if (token != null) {
      // Une modication est appliquée
      return true;
    } else {
      // Aucune modification n'est appliquée
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
        sessionStorage.removeItem('email');
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
  getUser(user: Users): Users {
    var modelUser: Users = {
      providerId: user.providerId,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    return modelUser;
  }

  updateEmail(newEmail: string) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateEmail(user, newEmail).then(() => {
        console.log('Email updated');
        sessionStorage.setItem('email', newEmail);
        this.router.navigate(['/Profile']);
      }).catch((error: Error) => {
        console.error(error);
      });
    } else {
      console.error('No user is signed in');
    }
  });
}

updatePassword(password: string, confirmPassword: string) {

  if (password !== confirmPassword) {
    console.error('Password and confirm password do not match');
    return;
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      updatePassword(user, password).then(() => {
        console.log('Password updated');
        this.router.navigate(['/Profile']);
      }).catch((error: Error) => {
        console.error(error);
      });
    } else {
      console.error('No user is signed in');
    }
  });
}

  /**
   * Redirige l'utilisateur vers la page d'accueil.
   */
  returnHome() {
    this.router.navigate(['/']);
  }

  returnProfile() {
    this.router.navigate(['/Profile']);
  }
}
