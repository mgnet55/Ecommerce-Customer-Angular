import { Component, Input, OnInit } from '@angular/core';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product!: VmCardProduct;

  constructor() {
  }

  ngOnInit(): void {

  }


}


