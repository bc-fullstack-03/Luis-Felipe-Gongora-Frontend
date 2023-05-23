export interface UserProfile {
  _id: string;
  name: string;
  following: UserProfile[];
  followers: UserProfile[];
}
