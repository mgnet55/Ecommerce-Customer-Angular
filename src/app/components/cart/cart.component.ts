import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { Governate } from 'src/app/models/governate';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Checkout } from 'src/app/vm/checkout';
import { UpdateCart } from 'src/app/vm/update-cart';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CartInfo } from 'src/app/vm/cart-info';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any
  items: any
  totalPrice = 0
  updateItem: UpdateCart[] = []
  paymentHandler: any = null;
  success: boolean = false
  imagesURL:string = environment.images
  failure: boolean = false
  error:any
  // governate ------------------------
  governates: Governate[] = [];
  cities: City[] =[];
  governateID: number = 0;
  // -------------------------
  cartInfo:CartInfo={} as CartInfo
  constructor(private cartService: CartService,
    private checkout: CheckoutService,
    private authService: AuthService,
    private router:Router,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(
      (data: any) => {
        this.cart = data.data.cart;
        this.items = data.data.items
        this.totalPrice = data.data.totalPrice
        console.log(this.items,'dd')
      }
    )
    this.invokeStripe()
    // Governates ------------------
    this.authService.governates().subscribe(res => {
      console.log(res);
      this.governates = res;
      console.log(this.governateID);

    })

  }
  // City selection Function ----------------
  onChange(event: any) {
    this.cities=this.governates[event.target.value].cities;
  }
  // -----------------------------------------------

  updateItems(id: number, quantity: any) {
    let flag = 0
    this.updateItem.forEach(item => {
      if (item.id == id) {
        item.quantity = quantity.value
        flag = 1
      }
    })
    if (flag == 0) {
      this.updateItem.push({ id: id, quantity: quantity.value })
    }
  }
  updateCart() {
    this.cartService.updateCartItems(this.updateItem).subscribe(
      (data: any) => {
        this.cart = data.data.cart;
        this.items = data.data.items
        this.totalPrice = data.data.totalPrice
        this.authService.cartItem=data.data.totalQuantity
        this.toast.success(data.message)
      },
      err=>{
        this.toast.warning(err.error.message)
      })
  }
  removeItem(id: number) {
    this.cartService.deleteItemFromCart(id).subscribe(
      (data: any) => {
        this.cart = data.data.cart;
        this.items = data.data.items
        this.totalPrice = data.data.totalPrice
        this.authService.cartItem=data.data.totalQuantity
        this.toast.success(data.message)
      }
    )
  }
 setInfo(event:any)
 {
    if(event.name==='city')
    {
      this.cartInfo.city_id=event.value
    }
    else
    {
      this.cartInfo.street=event.value
    }
 }
 setcart()
 {
    this.cartService.setCartInfo(this.cartInfo).subscribe(
     (res:any)=>{
       this.cart=res.data
       this.toast.success(res.message)},
     (err)=>{this.error=err.error.errors
           }
   )
 }
  makePayment(amount: number) {
    console.log('dddd')
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Klg7rF1z6T6MzALDH7c25SCyL57wz4XXDDukwbaJ4rlhgJdlxfJRd87MSWCch2xnYf6yyRE6jtnLGVnvNmU7LGr00HvzaiQdT',
      locale: 'auto',
      token: function (stripeToken: any) {
        let token: Checkout = { stripeToken: stripeToken.id, email: stripeToken.email };
        paymentstripe(token);
      },
    });
    const paymentstripe = (token: Checkout) => {
      this.checkout.checkout(token).subscribe((data: any) => {
        this.toast.success(data.message)
        this.authService.cartItem=0
        this.router.navigate(['/myorders'])
      },
        err => console.log('faild'));
    };
    paymentHandler.open({
      name: 'ITI SHOPE',
      description: 'feel free to enter your card data',
      amount: amount * 100
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Klg7rF1z6T6MzALDH7c25SCyL57wz4XXDDukwbaJ4rlhgJdlxfJRd87MSWCch2xnYf6yyRE6jtnLGVnvNmU7LGr00HvzaiQdT',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
