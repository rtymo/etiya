export interface Roles {
    user?: boolean;
    admin?: boolean;
  }
  
  export interface User {
    uid: string;
    email: string;
    roles: Roles;
    name: string;
    surname: string;
    gender: string;
    phone: string;
    address: string;
    img: string;
  }
  