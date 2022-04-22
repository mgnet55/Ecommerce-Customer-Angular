export interface Order {
created_at: string,
customer_id: number,
id: number
notes?: string
order_items: [
  {

description: string,
discount: number
id: number
image: string
name: string
picked: boolean
price: number
product_id: number
quantity: number
sale_price: number
total: number
created_at: string,
  }
]

shipping_company_id: number
status: string
street: string
total: number

}
