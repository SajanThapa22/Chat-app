export interface User {
  id: string;
  username: string;
  email: string;
  profile: {
    profile_pic: string;
  };
  user_status: {
    status: string;
    last_seen: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  initialCheckDone: boolean;
  user: User | null;
}
