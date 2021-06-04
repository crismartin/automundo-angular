import {Role} from './role.model';

export interface User {
  token: string;
  realName?: string;
  userName?: string;
  role?: Role;
}
