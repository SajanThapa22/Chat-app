export interface Message {
  id: number;
  user: string;
  chat_history: string;
  message: string;
  media: null;
  reply_of: null;
  sent_timestamp: string;
  delivered_timestamp: null;
  seen_timestamp: null;
}

export interface Users {
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

export interface Results {
  chat_history: string;
  user: Users;
  messages: Message[];
}

export interface Data {
  count: number;
  next: null;
  previous: null;
  results: Results[];
}

export interface ChatState {
  chatHistories: Results[];
  currentChat: Results | null;
  isLoading: boolean;
  error: string | null;
}
