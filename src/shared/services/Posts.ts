import { Comment } from '../../models/Comment';
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

export const likeComment = async (
  postId: string,
  commentId: string,
  comment: Comment,
  profile: string
): Promise<Comment> => {
  await api.post(
    `/posts/${postId}/comments/${commentId}/like`,
    null,
    getAuthHeader()
  );
  return likeC(comment, profile);
};

const likeC = (comment: Comment, profile: string) => {
  comment.likes.push(profile);
  return comment;
};

export const unlikeComment = async (
  postId: string,
  commentId: string,
  comment: Comment,
  profile: string
): Promise<Comment> => {
  api.post(
    `/posts/${postId}/comments/${commentId}/unlike`,
    null,
    getAuthHeader()
  );
  return unlikeC(comment, profile);
};

const unlikeC = (comment: Comment, profile: string) => {
  const index = comment.likes.indexOf(profile);
  comment.likes.splice(index, 1);
  return comment;
};
