import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from 'src/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  email: string = sessionStorage.getItem('email')!;
  password: string = '';
  confirmPassword: string = '';
  selectedFile: File | null = null;
  errorMessages: string = '';
  userForm: FormGroup;

  constructor(
    private http: HttpClient,
    private firebase: FirebaseService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      emailGroup: this.fb.group({
        email: ['', Validators.required],
      }),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onSubmit() {
    this.errorMessages = '';
    const emailGroup = this.userForm.get('emailGroup');
    const passwordGroup = this.userForm.get('passwordGroup');

    if (emailGroup?.valid) {
      const email = emailGroup.get('email')?.value;
      this.firebase.updateEmail(email);
      // handle file upload
    } else {
      this.errorMessages += 'Email Invalid ';
    }

    if (passwordGroup?.valid) {
      const password = passwordGroup.get('password')?.value;
      const confirmPassword = passwordGroup.get('confirmPassword')?.value;
      this.firebase.updatePassword(password, confirmPassword);
    } else {
      this.errorMessages += 'Password Invalid or Confirm Password Invalid';
    }
  }
}
