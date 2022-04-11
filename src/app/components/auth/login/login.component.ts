import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginStatus : boolean = false
  loginFormGroup:FormGroup
  constructor(private AuthService:AuthService,
              private fb:FormBuilder,
              private router:Router,
              ){

    this.loginFormGroup = this.fb.group({
      email: ['',[Validators.required,Validators.minLength(3)]],
      password:[''],

    })
  }
  ngOnInit(): void {
    this.AuthService.isUserLoggedSubject().subscribe(status=>{
      this.loginStatus = status;
      console.log(this.loginStatus)
    });
  }

  login(){
    this.AuthService.login(this.loginFormGroup.value).subscribe(ele=>{
      if(ele){
        let userToken = ele.data.token;
        localStorage.setItem('userToken',userToken);
        this.router.navigate(['products']);
      }
    })
  }

  logout(){
    this.AuthService.logout();
    localStorage.removeItem('userToken');
  }

}
