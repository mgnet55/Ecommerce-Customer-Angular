import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginStatus : boolean = false
  loginFormGroup:FormGroup

  errorMessage: number | string | null = 0
  constructor(private AuthService:AuthService,
              private fb:FormBuilder,
              private router:Router,
              private cart:CartService,
              private activatedRoute:ActivatedRoute,
              private toast:ToastrService){

    this.loginFormGroup = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:[''],

    })
  }
  ngOnInit(): void {
    // this.AuthService.isUserLoggedSubject().subscribe(status=>{
    //   this.loginStatus = status;
    //   console.log(this.loginStatus)
    // });

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.errorMessage = (paramMap.get('error'))?this.activatedRoute.snapshot.paramMap.get('error'):0;
      })
  }

  login(){
    this.AuthService.login(this.loginFormGroup.value).subscribe(
         data =>{
          let userToken = data.data.token;
          localStorage.setItem('userToken',userToken);
        this.AuthService.prepareUserData()
        this.router.navigate(['home',data.data.name]);
      },
      error =>{
        // this.router.navigate(['login','Invalid Email or Password']);
        this.toast.error('Invalid Email or Password');
       
      });
  }
}
