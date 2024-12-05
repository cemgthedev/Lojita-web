import { RolesType } from "./enum/roles.enum";

export interface TUser {
  id: number;
  createdAt: Date;

  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  permissionGroupId: number;

  permissionGroup?: {
    id: number;
    name: string;
  };

  role?: RolesType;
}
