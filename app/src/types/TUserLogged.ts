import { RolesType } from "./enum/roles.enum";
import { PermissionType } from "./permission";

export type TUserLogged = {
  id: number;
  createdAt: Date;

  name: string;
  email: string;

  avatarUrl?: string;
  permissionGroupId: number;
  permissionGroup: {
    id: number;
    name: string;
    permissions: PermissionType[];
  };

  role: RolesType;

  exp?: number;
  iat?: number;
};
