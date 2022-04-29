import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { Governate } from 'src/app/models/governate';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploader } from "ng2-file-upload";
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  formData: FormData = new FormData()
  selectedFile: string | null = null;
  RegisterationForm: FormGroup;
  governates: Governate[] = [];
  cities: City[] = [];
  governateID: number = 0;
  errors:any
  errorMessage: number | string | null = 0
  isFormSubmitted=false
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private titleService: Title) {
      this.titleService.setTitle('Register')
      
    this.RegisterationForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      city: ['', [Validators.required]],
      image: ['', [Validators.required]],
      imageSource:['',[Validators.required]],
      governate: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
      { validators: this.passwordMatch() }
    );
  }

  ngOnInit(): void {
    this.authService.governates().subscribe((res:any) => {
      this.governates = res.data;
    })

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.errorMessage = (paramMap.get('error')) ? this.activatedRoute.snapshot.paramMap.get('error') : 0;
    })
  }

  onChange(event: any) {
    this.cities = this.governates[event.target.value].cities;
  }
  // Errors Handling---------------

  get name() {
    return this.RegisterationForm.get('name');
  }
  get imageSource() {
    return this.RegisterationForm.get('imageSource');
  }
  get image() {
    return this.RegisterationForm.get('image');
  }

  get email() {
    return this.RegisterationForm.get('email');
  }

  get phone() {
    return this.RegisterationForm.get('phone');
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


  passwordMatch(): ValidatorFn {
    return (frmGroup: AbstractControl): ValidationErrors | null => {
      let passControl = frmGroup.get('password');
      let confirmPassControl = frmGroup.get('confirmPassword');
      if (!passControl || !confirmPassControl || !passControl.value || !confirmPassControl.value)
        return null;

      let valErr = { 'UnmatchedPassword': { 'pass': passControl?.value, 'confrim': confirmPassControl?.value } }
      return (passControl?.value == confirmPassControl?.value) ? null : valErr;
    }
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
  let fileType = event.target.files[0].type;
  if (fileType.match(/image\/*/)) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.RegisterationForm.patchValue({
        imageSource: file
      });
    };
    this.formData.append('avatar', file);
  } 
  }

  registerUser() {
    this.isFormSubmitted=true
    if(this.RegisterationForm.valid)
    {
      this.formData.append('name', this.name?.value);
    this.formData.append('email', this.email?.value);
    this.formData.append('phone', this.phone?.value);
    this.formData.append('city_id', this.city?.value);
    this.formData.append('address', this.address?.value);
    this.formData.append('password', this.password?.value);
    this.formData.append('password_confirmation', this.confirmPassword?.value);
    this.authService.register(this.formData).subscribe(
      data => {
        let userToken = data.data.token;
        localStorage.setItem('userToken', userToken);
        this.authService.prepareUserData()
        this.router.navigate(['home']);
      },
      error => {
        this.errors=error.error.errors
        this.toast.error(error.error.message);
      });
    }
    
  }




}
