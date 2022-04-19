import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CartAdding } from 'src/app/vm/cart-adding';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product!: VmCardProduct;
  imagesURL: string = environment.images

  quantity: CartAdding = { quantity: 1 }
  constructor(private cartService: CartService,
                      private authService: AuthService,
                      private toast:ToastrService) {
  }

  ngOnInit(): void {

  }

  addToCart(id: number) {
    if (this.authService.currentUser.email != '') {
      this.cartService.addItemToCart(id, this.quantity).subscribe(
        (data: any) => {
          this.authService.cartItem = data.data.totalQuantity
          this.toast.success(data.message);
        },error=>{
          this.toast.warning(error.error.message);
        })
    } else {
      this.toast.warning('You Should Login!');
    }

  }
}


