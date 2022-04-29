import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';
import { ProductsService } from 'src/app/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itemsPerSlide = 4;
  singleSlideOffset = true;
  noWrap = false;
  username:string | null= '';
  saleUp50: any ;
  bestsale:any;
  latestProduct:any;
  flashSale:any
  imagesURL: string = environment.images
  @ViewChild('sale') sale!:ElementRef
  constructor(private activatedRoute:ActivatedRoute,
              private productsService:ProductsService,
              private titleService: Title) {
                this.titleService.setTitle('Home')

  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(window.innerWidth<720)
    { 
      this.sale.nativeElement.itemsPerSlide=2
      console.log(this.itemsPerSlide)
    }
    if(window.innerWidth<520)
    { 
      this.sale.nativeElement.itemsPerSlide=1
      console.log(this.itemsPerSlide)
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.username = (paramMap.get('username'))? this.activatedRoute.snapshot.paramMap.get('username'): '';
      })

      this.productsService.getStatistic().subscribe((prods:any)=>{
        this.saleUp50 = prods.data.sale50
        this.bestsale=prods.data.best70
        this.latestProduct=prods.data.lastProduct.data
        this.flashSale=prods.data.flashSale
      })
      if (window.innerWidth<720) {
        this.itemsPerSlide = 2;
      }
       if(window.innerWidth<520) {
        this.itemsPerSlide = 1;
      }
  }
  private adjustsItemsPerSlide() {
    
    if (window.innerWidth<720) {
      this.itemsPerSlide = 2;
    }
     if(window.innerWidth<520) {
      this.itemsPerSlide = 1;
    }
  }

}
