import { User } from "../types/user";

const AUTH_USER_PROFILE = 'user';

export const getUser = (): string => {
  const user = localStorage.getItem(AUTH_USER_PROFILE);
  return user ?? '';
};

export const saveUser = (user: User): void => {
  localStorage.setItem(AUTH_USER_PROFILE, JSON.stringify(user));
};

export const dropUser = (): void => {
  localStorage.removeItem(AUTH_USER_PROFILE);
};
