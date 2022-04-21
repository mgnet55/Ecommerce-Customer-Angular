import { Component,OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { City } from 'src/app/models/city';
import { Governate } from 'src/app/models/governate';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public  uploader : FileUploader = new FileUploader({});
  formData : FormData = new FormData()
  selectedFile :string | null= null;

  EditUsrForm: FormGroup;
  governates : Governate[] = [];
  cities : City[]= [];
  governateID: number = 0;
  errorMessage: number | string | null = 0
  updatedUsr : User = {} as User;
  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {

    this.EditUsrForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      // file: ['', [Validators.required]],
      city: ['',[Validators.required]],
      governate: ['',[Validators.required]],
      address: ['',[Validators.required]],
      // password: ['', [Validators.required, Validators.minLength(8)]],
      // confirmPassword: ['', [Validators.required]],
    },
    {validators: this.passwordMatch()}
    );

    }

    ngOnInit(): void {
      this.authService.governates().subscribe(res=>{
        console.log(res);
        this.governates = res;
        console.log(this.governateID);

        this.authService.myProfile().subscribe((ele:any)=>{

          this.EditUsrForm.setValue({
           name: ele.data.name,
           email:ele.data.email,
           phone: ele.data.phone,
           city:ele.data.city.id,
           governate:2,
           address:ele.data.address,
          });

          console.log(this.EditUsrForm.value)
        })

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
        return this.EditUsrForm.get('name');
      }

      get email() {
        return this.EditUsrForm.get('email');
      }

      get phone() {
        return this.EditUsrForm.get('phone');
      }

      get city() {
        return this.EditUsrForm.get('city');
      }

      get address() {
        return this.EditUsrForm.get('address');
      }

      get password() {
        return this.EditUsrForm.get('password');
      }

      get confirmPassword() {
        return this.EditUsrForm.get('confirmPassword');
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

      // Image upload

      onFileSelect(event:any) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0] as File;
          console.log(file);
          this.selectedFile = file.name;
          this.formData.append('avatar', file);
          console.log(this.formData);
        }
      }

      updateUser(){

        // let userModel = {
        //   name: this.EditUsrForm.value.name,
        //   email: this.EditUsrForm.value.email,
        //   phone: this.EditUsrForm.value.phone,
        //   city_id: this.EditUsrForm.value.city,
        //   address: this.EditUsrForm.value.address,
        //   // password: this.EditUsrForm.value.password,
        //   // password_confirmation: this.EditUsrForm.value.password,
        //  }

        this.formData.append('name',this.name?.value);
        this.formData.append('email',this.email?.value);
        this.formData.append('phone',this.phone?.value);
        this.formData.append('city_id',this.city?.value);
        this.formData.append('address',this.address?.value);


        this.authService.editProfile(this.formData).subscribe(
          data =>{
            // console.log(data)
            this.router.navigate(['user/profile']);
          },
          error =>{
            this.router.navigate(['user/edit',error.error['message']]);
            // console.log(error.error);
          });
      }

}
