export interface UserAttribute {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  password: string;
  remember_token?: string;
  open_id?: string;
}
