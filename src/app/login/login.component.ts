import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(private fb: FormBuilder, private fireBase: FirebaseService) { }

  ngOnInit(): void {
    console.log(this.fireBase.userIsConnected());
  }

  async onSubmitForm() {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      var result = await this.fireBase.loginWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password);
      console.log('connexion : '+ result)
      
    }else{
      console.log('Form not valid!', this.userForm.value);
    }

  }
  

}
