import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { Governate } from 'src/app/models/governate';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Checkout } from 'src/app/vm/checkout';
import { UpdateCart } from 'src/app/vm/update-cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:any
  items:any
  totalPrice=0
  updateItem:UpdateCart[]=[]
  paymentHandler: any = null;
  success: boolean = false

  failure:boolean = false

// governate ------------------------
  governates : Governate[] = [];
  cities : City[]= [];
  governateID: number = 0;
  // -------------------------

  constructor(private cartService:CartService,
              private checkout:CheckoutService,
              private authService:AuthService) { }

  ngOnInit(): void {
    console.log('lll')
    this.cartService.getCart().subscribe(
      (data:any)=>{this.cart=data.data.cart;
                  this.items=data.data.items
              this.totalPrice=data.data.totalPrice
            },
            err=>{
              console.log(err)
            }
    )
    this.invokeStripe()

    // Governates ------------------

    this.authService.governates().subscribe(res=>{
      console.log(res);
      this.governates = res;
      console.log(this.governateID);

    })

  }


// City selection Function ----------------
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
// -----------------------------------------------

  updateItems(id:number,quantity:any)
  {
    let flag=0
    this.updateItem.forEach(item=>{
      if(item.id==id)
      {
        item.quantity=quantity.value
        flag=1
      }
    })
    if(flag==0)
      {
        this.updateItem.push({id:id,quantity:quantity.value})
      }
  }
  updateCart()
  {
    this.cartService.updateCartItems(this.updateItem).subscribe(
        (data:any)=>{this.cart=data.data.cart;
              this.totalPrice=data.data.totalPrice})
}

  removeItem(id:number)
  {
    this.cartService.deleteItemFromCart(id).subscribe(
      (data:any)=>{
        this.cart=data.data.cart;
        console.log(data)
        this.totalPrice=data.data.totalPrice
      }
    )}

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Klg7rF1z6T6MzALDH7c25SCyL57wz4XXDDukwbaJ4rlhgJdlxfJRd87MSWCch2xnYf6yyRE6jtnLGVnvNmU7LGr00HvzaiQdT',
      locale: 'auto',
      token: function (stripeToken: any) {
        let token:Checkout={stripeToken:stripeToken.id,email:stripeToken.email};
        paymentstripe(token);
      },
    });
    const paymentstripe = (token: Checkout) => {
      this.checkout.checkout(token).subscribe((data: any) => {
        console.log(data,'l');
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.failure = true
        }
      },
      err=>console.log('faild'));
    };
    paymentHandler.open({
      name: 'على الله الحكايه',
      description: 'اوعى تدخل رقم الفيزا احنا اصلا حرميه وبنحاول نغفلك',
      amount:amount*100
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
