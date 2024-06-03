export interface UserAttribute {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  password: string;
  remember_token?: string;
  open_id?: string;
  role_user_id?: number;
  profile?: UserProfileAttributes;
}

export interface UserPayload {
  id: number;
  email: string;
}

export interface UserProfileAttributes {
  fullname?: string;
  address?: string[];
  images?: string;
}
