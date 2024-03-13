import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';
import { Router } from '@angular/router';
import { Users } from 'src/models/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  public errorMessage: string = '';
  private user: Users = {} as Users;

  constructor(private fb: FormBuilder, private fireBase: FirebaseService, private route: Router) { }

  ngOnInit(): void {
    if (this.fireBase.userIsConnected()!==false) {
      this.fireBase.returnHome();
    }
  }

  async onSubmitForm() {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      try {
        var result = await this.fireBase.loginWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password);
        console.log('connexion : '+ result);
        if (result) {
          // Connexion réussie, naviguer vers la page d'accueil
          var isConnected = this.fireBase.userIsConnected();
          if (isConnected !== false) {
            console.log('User connected : ');
            this.user = isConnected as Users;
            console.log(this.user);
            this.route.navigate(['/Home']);
          }
          //this.route.navigate(['/Home']);
        } else {
          // Connexion échouée, mot de passe ou email incorrect
          this.errorMessage = 'Connexion échouée ! Veuillez vérifier vos identifiants.';
        }
      } catch (error) {
        console.error(error);
        // Connexion échouée, mot de passe ou email incorrect
        this.errorMessage = 'Connexion échouée ! Veuillez vérifier vos identifiants.';
      }
    } else {
      // Les champs ne sont pas valides
      this.errorMessage = 'Champs invalides ! Veuillez vérifier les champs de saisie.';
    }
  }
}

