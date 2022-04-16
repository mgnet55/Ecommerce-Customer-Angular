import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  prodID : number = 0;
  apiUrl = 'http://localhost:8000';
  products : VmCardProduct[] = []
  constructor(private activatedRoute:ActivatedRoute,
              private productService:ProductsService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.prodID = (paramMap.get('ID'))?Number(this.activatedRoute.snapshot.paramMap.get('ID')):0;

      console.log(this.prodID)
      this.productService.prodBtByID(this.prodID).subscribe(

        res=> this.products[0] = res.data
        );
      })

  }

}
