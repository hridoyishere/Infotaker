import type { User } from "./authApi";

export const saveAuthData = (
  token: string,
  user: User
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = (): User | null => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};