import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/models/category';

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
  currentPage: number = 1
  lastPage: number = 1

  constructor(private productsService: ProductsService, private CategoriesService: CategoriesService) {
    this.products = []
    this.categories = []
    this.selectedCategory = 0
  }

  ngOnInit(): void {

    this.CategoriesService.getAllCategories().subscribe(response => {
      this.categories = response.data
    })

    this.getAllProducts()

  }

  getAllProducts() {
    this.productsService.getAllProducts(this.currentPage).subscribe(response => {
      this.products = response.data.data
      this.currentPage = response.data.current_page
      this.lastPage = response.data.last_page
    
    })
  }

  productTrackBy(index: any, product: VmCardProduct) {
    return product.id;
  }

  selectCategory(id: number) {
    this.selectedCategory = id
    this.productsService.getProductsByCategory(id, this.currentPage).subscribe(response => {
      this.products = response.data.data
      this.currentPage = response.data.current_page
      this.lastPage = response.data.last_page
    })
  }

  searchProducts() {
    if (this.searchBy) {
      this.selectedCategory = 0
      this.productsService.serachProducts(this.searchBy, this.currentPage).subscribe(response => {
        this.products = response.data.data
        this.currentPage = response.data.current_page
        this.lastPage = response.data.last_page

      })
    }
    else this.getAllProducts();
  }

}
