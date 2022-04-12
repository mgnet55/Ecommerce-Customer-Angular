import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmCardProduct } from 'src/app/models/view_models/VmCardProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:string | null= '';
  products: VmCardProduct[];
  constructor(private activatedRoute:ActivatedRoute) {
    this.products = [
      {id: 1,name: 'test1',price: 50,discount: 0,imageUrl: 'https://dummyimage.com/400x400/000/fff&text=user_avatar',category_name: 'cat1',available: 10},
      {id: 2,name: 'test2',price: 50,discount: 0,imageUrl: 'https://dummyimage.com/400x400/000/fff&text=user_avatar',category_name: 'cat1',available: 10},
      {id: 3,name: 'test3',price: 50,discount: 0,imageUrl: 'https://dummyimage.com/400x400/000/fff&text=user_avatar',category_name: 'cat1',available: 10},
      {id: 4,name: 'test4',price: 50,discount: 0,imageUrl: 'https://dummyimage.com/400x400/000/fff&text=user_avatar',category_name: 'cat1',available: 10},
    ]
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.username = (paramMap.get('username'))? this.activatedRoute.snapshot.paramMap.get('username'): '';

      })
  }

}
