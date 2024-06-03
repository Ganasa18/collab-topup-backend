export interface MenuAttributes {
  id: number;
  menu_name: string;
}

export interface SubMenuAttributes {
  id: number;
  menu_id: number;
  submenu_name: string;
  path_url: string;
  icon: string;
  is_active?: boolean;
}

export interface MenuAccessAttributes {
  id: number;
  level_user_id: number;
  menu_id: number;
  access?: boolean;
  add?: boolean;
  edit?: boolean;
  remove?: boolean;
}

export interface MenuRemapAttributes {
  id: number;
  menu_name: string;
  submenu_name: string;
  path_url: string;
  icon: string;
  access: boolean;
  add: boolean;
  edit: boolean;
  remove: boolean;
}
