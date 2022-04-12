export interface Product {
  id: number,
  name:string
  image?: string
  description:string
  price:number
  discount:number
  quantity:number
  user_id?:number
  category?:{
    id:number,
    name:string
  }
}
