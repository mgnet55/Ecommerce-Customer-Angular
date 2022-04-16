export interface User {
  name: string,
  email: string,
  phone: string,
  address: string,
  city: {
    id: number,
    name: string,
    governorate: {
      id: number,
      name: string,
    }
}
}
