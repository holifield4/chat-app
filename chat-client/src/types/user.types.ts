export interface Token {
  token: string | null;
  isAuthenticated: boolean;
  storeToken: (token: string) => void;
  logout: () => void;
}

export interface User {
  username: string;
  userCurrentRoom: string | null;
  setUsername: (name: string) => void;
  setUserCurrentRoom: (roomId: string | null) => void;
  removeUser: () => void;
}

export interface LoginResponse {
  message?: string;
  token?: string;
  error?: string;
}






