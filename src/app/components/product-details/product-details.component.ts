import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartAdding } from 'src/app/vm/cart-adding';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  prodID : number = 0;

  imagesURL = environment.images
  products : VmCardProduct[] = []
  quantity:CartAdding = {quantity:1} as CartAdding;
  constructor(private activatedRoute:ActivatedRoute,
              private productService:ProductsService,
              private authService:AuthService,
              private cartService:CartService,
              private ToastrService:ToastrService,

              ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.prodID = (paramMap.get('ID'))?Number(this.activatedRoute.snapshot.paramMap.get('ID')):0;

      console.log(this.prodID)
      this.productService.prodBtByID(this.prodID).subscribe(

        res=> this.products[0] = res.data
        );
      })

  }

  onChange(event:any){
      this.quantity.quantity = event.target.value
  }

  addToCart(id:number){
    if (this.authService.currentUser.email != '') {
      this.cartService.addItemToCart(id, this.quantity).subscribe(
        (data: any) => {
          this.authService.cartItem = data.data.totalQuantity
          this.ToastrService.success(data.message)
        },error=>{
          this.ToastrService.warning(error.error.message);
        })
    } else {
      this.ToastrService.warning('You Should Login!');
    }
  }
}
