import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { BsModalRef, BsModalService, ModalContainerComponent } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems:any;
  modalRef?: BsModalRef;
  formData: FormGroup
  isFormSubmitted = false
  errors: any
  @ViewChild('loginModal', { static: true }) basicModal!: ModalContainerComponent;
  constructor(private cartSevice:CartService,
              public AuthService:AuthService,
              private Router:Router,
              private modalService:BsModalService,
              private formBuilder: FormBuilder,
              private toast:ToastrService,
              ) 
  {
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })          
  }

  ngOnInit(): void {
    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  cart(template: TemplateRef<any>)
  {
    if(this.AuthService.loginStatus)
    {
      this.Router.navigate(['/cart'])
    }
    else{
      this.modalRef = this.modalService.show(template);
    }
  }
  login()
  {
    if(this.formData.valid)
    {
      this.AuthService.login(this.formData.value).subscribe(
        data =>{
         let userToken = data.data.token;
         localStorage.setItem('userToken',userToken);
       this.AuthService.prepareUserData()
       this.Router.navigate(['home',data.data.name]);
       this.modalRef?.hide()
       this.formData.reset()
       this.isFormSubmitted=false
     },
     error =>{
       
       this.toast.error('Invalid Email or Password');
      
     });
    }
    this.isFormSubmitted=true
  }

  get email()
  {
    return this.formData.get('email')
  }
  get password()
  {
    return this.formData.get('password')
  }

  logout(){
    localStorage.removeItem('userToken');
    this.AuthService.cartItem=0
    this.Router.navigate(['home']);
  }

}
