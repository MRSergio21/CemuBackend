export interface AuthInput {
  email: string;
  password: string;
}

export interface RegisterInput extends AuthInput {
  username: string;
}

export interface SafeUser {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: SafeUser;
}
