import { AxiosResponse } from "axios";
import { api } from "../store";
import { User } from "../types/user";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<User[]>> {
    return api.get<User[]>('/users')
  }
}
