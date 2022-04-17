import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  
  constructor(private httpClient:HttpClient
  ) {
   }
   getAllProducts(page:number=1):Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/products?page=${page}`)
   }

   getProductsByCategory(id:number,page:number=1):Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/products/category/${id}&page=${page}`)

   }

   serachProducts(query:string,page:number=1):Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/products?search=${query}&page=${page}`)

   }

   prodBtByID(ID:number):Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/products/${ID}`)

   }
}
