export interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    _id: string;
    name: string;
    user: string;
  };
  comments: string[];
  likes: string[];
  image: boolean;
}
