import {CategoriesService} from 'src/app/services/categories.service';
import {Component, OnInit} from '@angular/core';
import {VmCardProduct} from 'src/app/models/view_models/VmCardProduct';
import {ProductsService} from 'src/app/services/products.service';
import {Category} from 'src/app/models/category';
import {environment} from "src/environments/environment";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: Category[];
  products: VmCardProduct[];
  page = 1;
  itemsPerPage = 30;
  totalItems: any;
  selectedCategory = 0

  constructor(private productsService: ProductsService, private CategoriesService: CategoriesService,
    private titleService: Title) {
    this.titleService.setTitle('Shop')
      
    this.products = [];
    this.categories = [];
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((res: any) => {
      this.setPagination(res.data)
    })
    this.CategoriesService.getAllCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  productTrackBy(index: any, product: VmCardProduct) {
    return product.id;
  }

  selectCategory(id: number) {
    if (id == 0) {
      this.productsService.getAllProducts().subscribe((res: any) => {
        this.setPagination(res.data)
        this.selectedCategory = id
      })
    } else {
      this.productsService.getProductsByCategory(id).subscribe((res: any) => {
        this.setPagination(res.data)
        this.selectedCategory = id
      })
    }

  }

  searchProducts(search: any) {
    this.productsService.serachProducts(search).subscribe((res: any) => {
      this.setPagination(res.data)
    })
  }

  getPage(page: any) {

    this.productsService.getAllProducts(+page).subscribe((res: any) => {
      this.setPagination(res.data)
    })

  }

  setPagination(data: any) {
    this.products = data.data;
    this.totalItems = data.total
    this.itemsPerPage = data.per_page
  }

}
