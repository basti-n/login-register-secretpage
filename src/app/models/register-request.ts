import { LoginRequest } from './login-request';

export interface RegisterRequest extends LoginRequest {
  passwordConfirm?: string;
}
