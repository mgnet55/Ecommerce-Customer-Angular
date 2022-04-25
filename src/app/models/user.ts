export interface User {
  name: string,
  email: string,
  avatar:string
  phone: string,
  address: string,
  location: {
    "city": string,
    "governorate": string,
    "address": string
}
  city: {
    id: number,
    name: string,
    governorate: {
      id: number,
      name: string,
    }
}
}
