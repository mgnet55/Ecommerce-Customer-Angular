import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:string | null= '';
  products: VmCardProduct[] = [];
  constructor(private activatedRoute:ActivatedRoute,
              private productsService:ProductsService) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.username = (paramMap.get('username'))? this.activatedRoute.snapshot.paramMap.get('username'): '';
      })

      this.productsService.getAllProducts().subscribe(prods=>{
        this.products = prods.data.data
      })
  }

}
