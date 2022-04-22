import {CategoriesService} from './../../services/categories.service';
import {Component, OnInit} from '@angular/core';
import {VmCardProduct} from 'src/app/models/view_models/VmCardProduct';
import {ProductsService} from 'src/app/services/products.service';
import {Category} from 'src/app/models/category';
import {environment} from "src/environments/environment";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: Category[];
  selectedCategory: number;
  searchBy: string = '';
  products: VmCardProduct[];
  page = 1;
  itemsPerPage = 30;
  totalItems: any;
  imageURL = environment.images

  constructor(private productsService: ProductsService, private CategoriesService: CategoriesService) {
    this.selectedCategory = 0
    this.products=[];
    this.categories=[];
  }

  ngOnInit(): void {
    this.getPage(this.page);
    this.CategoriesService.getAllCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  productTrackBy(index: any, product: VmCardProduct) {
    return product.id;
  }

  selectCategory(id: number) {
    this.selectedCategory = id
    this.searchBy=''
    this.page=1
    this.getPage(1);
  }

  searchProducts() {
    this.selectedCategory=0
    this.page=1
    this.getPage(1);
  }
// //
// // }


  getPage(page: any) {
    if (this.searchBy){
      this.productsService.serachProducts(this.searchBy,+page).subscribe((res: any) => {
        this.products = res.data.data;
        this.totalItems = res.data.total;
        this.itemsPerPage = res.data.per_page;
      })
    }
    if (this.selectedCategory) {
      this.productsService.getProductsByCategory(this.selectedCategory,+page).subscribe((res: any) => {
        this.products = res.data.data;
        this.totalItems = res.data.total;
        this.itemsPerPage = res.data.per_page;
      })
    }
     else {
      this.productsService.getAllProducts(+page).subscribe((res: any) => {
        this.products = res.data.data;
        this.totalItems = res.data.total;
        this.itemsPerPage = res.data.per_page;
      })
    }

  }

}
