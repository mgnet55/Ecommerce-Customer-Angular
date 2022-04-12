import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedFile : File | null = null;
  RegisterationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService:AuthService) {

    this.RegisterationForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      file: ['', [Validators.required]],
      fileSource: ['', [Validators.required]],
      city: ['',[Validators.required]],
      address: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {validators: this.passwordMatch()}
    );

    }

    ngOnInit(): void {
  }

      // Errors Handling---------------

      get name() {
        return this.RegisterationForm.get('fullName');
      }

      get email() {
        return this.RegisterationForm.get('email');
      }

      get phone() {
        return this.RegisterationForm.get('phone');
      }

      get file() {
        return this.RegisterationForm.get('avatar');
      }

      get city() {
        return this.RegisterationForm.get('city');
      }

      get address() {
        return this.RegisterationForm.get('address');
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


      onFileChange(event:any) {
        if (event.target.files.length > 0) {
          this.selectedFile = <File>event.target.files[0];
          console.log(this.selectedFile);
        }
      }

      registerUser(){
         const formData = new FormData();
        formData.append('avatar', this.selectedFile?this.selectedFile:'',this.selectedFile?.name);
        formData.append('name', this.RegisterationForm.get('name')?.value);
        formData.append('email', this.RegisterationForm.get('email')?.value);
        formData.append('phone', this.RegisterationForm.get('phone')?.value);
        formData.append('city_id', this.RegisterationForm.get('city_id')?.value);
        formData.append('address', this.RegisterationForm.get('address')?.value);
        formData.append('password', this.RegisterationForm.get('password')?.value);
        formData.append('password_confirmation', this.RegisterationForm.get('confirm_password')?.value);

         console.log(formData.getAll);
         let userModel = {
          name: this.RegisterationForm.value.name,
          email: this.RegisterationForm.value.email,
          phone: this.RegisterationForm.value.phone,
          avatar: formData,
          city_id: this.RegisterationForm.value.city,
          address: this.RegisterationForm.value.address,
          password: this.RegisterationForm.value.password,
          confirm_password: this.RegisterationForm.value.password,
         }
         console.log(formData)

        this.authService.register(userModel).subscribe({

        })
      }

}
