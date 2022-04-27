import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { Governate } from 'src/app/models/governate';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploader } from "ng2-file-upload";
import { ToastrService } from 'ngx-toastr';

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
  errorMessage: number | string | null = 0
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService) {

    this.RegisterationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      governate: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
      { validators: this.passwordMatch() }
    );
  }

  ngOnInit(): void {
    this.authService.governates().subscribe(res => {
      this.governates = res;
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
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedFile = file.name;
      this.formData.append('avatar', file);

    }
  }

  registerUser() {

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

        this.toast.error(error.error.message);
      });
  }




}
