export interface Product {
  description: string;
  id: string;
  name: string;
  price: number;
}

export interface User {
  _id?: string;
  email: string;
  name: string;
  password?: string;
  roles: string[];
  surname?: string;
}
