export interface Roles {
    user?: boolean;
    admin?: boolean;
  }
  
  export interface User {
    id: number;
    email?: string;
    roles?: Roles;
    name: string;
    surname: string;
    username: string;
    password: string;
    phone?: string;
    address?: string;
    img?: string;
    token?: string;
  }
  