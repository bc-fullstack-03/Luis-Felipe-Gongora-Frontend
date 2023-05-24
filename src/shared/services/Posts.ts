import { Post } from '../../models/Post';
import { api } from './api';
import { getAuthHeader } from './auth';

export const likePost = async (post: Post, profile: string): Promise<Post> => {
  api.post(`/posts/${post._id}/like`, null, getAuthHeader());
  return like(post, profile);
};

const like = (post: Post, profile: string) => {
  post.likes.push(profile);
  return post;
};

export const unlikePost = async (
  post: Post,
  profile: string
): Promise<Post> => {
  api.post(`/posts/${post._id}/unlike`, null, getAuthHeader());
  return unlike(post, profile);
};

const unlike = (post: Post, profile: string) => {
  const index = post.likes.indexOf(profile);
  post.likes.splice(index, 1);
  return post;
};
