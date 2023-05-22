export interface UserProfile {
  name: string;
  following: UserProfile[];
  followers: UserProfile[];
}
