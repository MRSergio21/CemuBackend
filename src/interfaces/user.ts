export interface NewUser {
  username: string;
  email: string;
  user_password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}
