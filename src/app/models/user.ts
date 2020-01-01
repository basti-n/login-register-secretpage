import { UserType } from './user-type';

export interface User {
  username: string;
  isLoggedIn: boolean;
  avatar?: string;
  created?: string;
  lastLoggedIn?: string;
  lastModified?: string;
  type?: UserType;
  encryptedPassword: string;
}
