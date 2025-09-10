export type User = {
  name: string;
  email: string;
};

const USER_KEY = "one_stop_user";
const ADMIN_KEY = "one_stop_admin";

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!getUser();
}

export function isAdminAuthenticated(): boolean {
  try {
    return localStorage.getItem(ADMIN_KEY) === "true";
  } catch {
    return false;
  }
}

export function setAdminAuth(val: boolean) {
  localStorage.setItem(ADMIN_KEY, val ? "true" : "false");
}

export function logout() {
  clearUser();
  setAdminAuth(false);
}
