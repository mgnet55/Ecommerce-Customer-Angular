import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { Governate } from 'src/app/models/governate';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  selectedFile : File | null = null;
  RegisterationForm: FormGroup;
  governates : Governate[] = [];
  cities : City[]= [];
  governateID: number = 0;
  errorMessage: number | string | null = 0
  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {

    this.RegisterationForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      // file: ['', [Validators.required]],
      city: ['',[Validators.required]],
      governate: ['',[Validators.required]],
      address: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {validators: this.passwordMatch()}
    );

    }

    ngOnInit(): void {
      this.authService.governates().subscribe(res=>{
        console.log(res);
        this.governates = res;
        console.log(this.governateID);

      })

      this.activatedRoute.paramMap.subscribe((paramMap)=>{
        this.errorMessage = (paramMap.get('error'))?this.activatedRoute.snapshot.paramMap.get('error'):0;
        })

  }

   onChange(event:any)
   {

    //  this.governateID = event.target.value
     console.log(this.governateID);

     this.authService.cities(+this.governateID).subscribe(res=>{
      console.log(res);
      this.cities = res;
      // console.log(this.cities)
    })

   }

      // Errors Handling---------------

      get name() {
        return this.RegisterationForm.get('name');
      }

      get email() {
        return this.RegisterationForm.get('email');
      }

      get phone() {
        return this.RegisterationForm.get('phone');
      }

      // get file() {
      //   return this.RegisterationForm.get('avatar');
      // }

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

        let userModel = {
          name: this.RegisterationForm.value.name,
          email: this.RegisterationForm.value.email,
          phone: this.RegisterationForm.value.phone,
          city_id: this.RegisterationForm.value.city,
          address: this.RegisterationForm.value.address,
          password: this.RegisterationForm.value.password,
          password_confirmation: this.RegisterationForm.value.password,
         }

         console.log(JSON.stringify(userModel));

        this.authService.register(userModel).subscribe(
          data =>{
            console.log(data)
            let userToken = data.data.token;
            localStorage.setItem('userToken',userToken);
            this.router.navigate(['home',data.data.name]);
          },
          error =>{
            this.router.navigate(['register',error.error['message']]);
          });
      }




}
