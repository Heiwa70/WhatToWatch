import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';
import { Router } from '@angular/router';
import { Users } from 'src/models/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public userForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validator: this.checkPassword }
  );

  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private fireBase: FirebaseService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  checkPassword(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass == confirmPass ? null : { notSame: true };
  }
  async onSubmitForm() {
    console.log(this.userForm.valid);

    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      try {
        var result = await this.fireBase.createUser(
          this.userForm.value.email,
          this.userForm.value.password
        );
        console.log('inscription : ' + result);
        if (result) {
          // inscription réussie
          this.fireBase.addDocument(
            'users',
            `${this.userForm.value.email}/liste/like`,
            {
              document: 'like',
              id: [],
              type: [],
            }
          );

          this.route.navigate(['/Login']);
        } else {
          // Connexion échouée, mot de passe ou email incorrect
          this.errorMessage =
            'Inscription échouée ! Veuillez vérifier vos identifiants.';
        }
      } catch (error) {
        console.error(error);
        // Connexion échouée, mot de passe ou email incorrect
        this.errorMessage =
          'Inscription échouée ! Veuillez vérifier vos identifiants.';
      }
    } else {
      // Les champs ne sont pas valides
      this.errorMessage =
        'Champs invalides ! Veuillez vérifier les champs de saisie.';
    }
  }
}
