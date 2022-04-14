import { Component, Input, OnInit } from '@angular/core';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product!: VmCardProduct;
  imagesURL:string = environment.images

  constructor() {
  }

  ngOnInit(): void {

  }


}


