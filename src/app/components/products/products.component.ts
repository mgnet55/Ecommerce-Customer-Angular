import { Component, OnInit } from '@angular/core';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  searchBy: string ='';
  products: VmCardProduct[] = [];
  constructor(private productsService:ProductsService) {

  }

  ngOnInit(): void {

    this.productsService.getAllProducts().subscribe(ele=>{
      this.products = ele.data.data

      console.log(this.products);
    })


    if (!this.searchBy) {
      //get all this.products
    } else {

    }
  }
  ngOnChanges(): void {
    //call service to get category products
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  productTrackBy(index:any, product:VmCardProduct) {
    return product.id;
  }

}
