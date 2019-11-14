export interface User {
  id?: string;
  email?: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  phone?: string;
  addressList: [
    {
      name: string,
      city: string,
      country: string,
      postalCode: number
    }
  ]
}
