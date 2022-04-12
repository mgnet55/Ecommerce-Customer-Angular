import { Component, OnInit } from '@angular/core';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  searchBy: string | undefined;
  products: VmCardProduct[];
  constructor() {
    this.products = [
      {id: 1,name: 'test1',price: 50,discount: 0,imageUrl: 'https://dummyimage.com/400x400/000/fff&text=user_avatar',category_name: 'cat1',available: 10},
      {id: 2,name: 'test2',price: 50,discount: 0,imageUrl: 'https://dummyimage.com/400x400/000/fff&text=user_avatar',category_name: 'cat1',available: 10},
      {id: 3,name: 'test3',price: 50,discount: 0,imageUrl: 'https://dummyimage.com/400x400/000/fff&text=user_avatar',category_name: 'cat1',available: 10},
      {id: 4,name: 'test4',price: 50,discount: 0,imageUrl: 'https://dummyimage.com/400x400/000/fff&text=user_avatar',category_name: 'cat1',available: 10},
    ]
  }

  ngOnInit(): void {

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
