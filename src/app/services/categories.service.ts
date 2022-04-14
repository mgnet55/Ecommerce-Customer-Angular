import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private httpOptions = {};
  constructor(private httpClient:HttpClient
  ) {
    this.httpOptions =  {headers: new HttpHeaders({
      'Content-Type': 'application/json','Accept':' application/json'
      })};

   }

   getAllCategories():Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/category`,this.httpOptions)
   }

}

