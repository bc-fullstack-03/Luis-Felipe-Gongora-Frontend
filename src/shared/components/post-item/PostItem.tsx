import { Chat, Heart, UserCircle } from '@phosphor-icons/react';

import { Post } from '../../../models/Post';
import { Link, useNavigate } from 'react-router-dom';

interface PostsProps {
  post: Post;
  handleLike: (postId: string) => void;
}

export const PostItem = ({ post, handleLike }: PostsProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('profile') as string;

  const like = (postId: string) => {
    handleLike(postId);
  };

  const handleClickPost = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className='ml-[283px] mt-5'>
      <div className='flex items-center gap-[6px] ml-5'>
        <UserCircle size={64} weight='light' className='text-gray-100' />
        <span className='text-2xl font-bold text-white'>
          {post.profile.name}
        </span>
      </div>
      <div className='flex flex-col ml-[91px] mb-7'>
        <div className='flex'>
          <Link to={`/posts/${post._id}`}>
            <h2 className='text-xl font-bold text-white'>{post.title}</h2>
          </Link>
        </div>
        {post.image ? (
          <img
            className='max-w-xs rounded-lg mb-5'
            src={post.description}
            alt=''
          />
        ) : (
          <p className='text-base font-normal text-gray-100 mb-5'>
            {post.description}
          </p>
        )}

        <div className='flex w-[236px] justify-between'>
          <button
            onClick={() => handleClickPost(post._id)}
            className='flex gap-2 items-center'
          >
            <Chat size={32} className='text-gray-100' />
            <span className='text-base font-normal text-white'>
              {post.comments.length}
            </span>
          </button>
          <button
            className='flex gap-2 items-center'
            onClick={() => like(post._id)}
          >
            {post.likes.includes(userId) ? (
              <Heart size={32} weight='fill' className='text-red' />
            ) : (
              <Heart size={32} className='text-gray-100' />
            )}

            <span className='text-base font-normal text-white'>
              {post.likes.length}
            </span>
          </button>
        </div>
      </div>
      <hr className='border-b border-secondary' />
    </div>
  );
};
