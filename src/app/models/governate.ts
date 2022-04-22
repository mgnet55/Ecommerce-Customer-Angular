export interface Governate {
  id: number,
  name: string
  cities:[{
    id:number,
    governorate_id:number,
    name:string,
    governorate_name:string
  }]
}
