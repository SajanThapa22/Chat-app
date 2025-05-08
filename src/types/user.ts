import { User } from "./chat";

export interface UserSearchResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: User[];
}
