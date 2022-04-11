import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterationForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.RegisterationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      email: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      governate: ['', [Validators.required]],
      city: ['',[Validators.required]],
      street: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {validators: this.passwordMatch()}
    );

    }

    ngOnInit(): void {
  }

      // Errors Handling---------------

      get fullName() {
        return this.RegisterationForm.get('fullName');
      }

      get email() {
        return this.RegisterationForm.get('email');
      }

      get phoneNo() {
        return this.RegisterationForm.get('phoneNo');
      }

      get governate() {
        return this.RegisterationForm.get('governate');
      }

      get city() {
        return this.RegisterationForm.get('city');
      }

      get street() {
        return this.RegisterationForm.get('street');
      }

      get password() {
        return this.RegisterationForm.get('password');
      }

      get confirmPassword() {
        return this.RegisterationForm.get('confirmPassword');
      }

      // Custom Validations-------------------

      // existEmailValidtion() : ValidatorFn{
      //   return (control:AbstractControl):ValidationErrors | null=>{

      //   }
      // }

      passwordMatch(): ValidatorFn {
        return (frmGroup: AbstractControl): ValidationErrors | null => {
          let passControl= frmGroup.get('password');
          let confirmPassControl= frmGroup.get('confirmPassword');
          if(!passControl || !confirmPassControl || !passControl.value || !confirmPassControl.value)
            return null;

          let valErr={'UnmatchedPassword': {'pass': passControl?.value, 'confrim': confirmPassControl?.value}}
          return (passControl?.value==confirmPassControl?.value)? null : valErr;
        }
      }


}
