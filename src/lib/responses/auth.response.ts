import {Jwtoken} from '../models/jwtoken';

export interface AuthResponse<T> {
  user: T
  token: Jwtoken
}
