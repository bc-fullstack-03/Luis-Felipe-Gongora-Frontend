import { Chat, Heart, UserCircle } from '@phosphor-icons/react';

import { Post } from '../../../models/Post';

interface PostsProps {
  post: Post;
}

export const Posts = ({ post }: PostsProps) => {
  return (
    <div className='ml-[283px] mt-5'>
      <div className='flex items-center gap-[6px] ml-5'>
        <UserCircle size={64} className='text-gray-100' />
        <span className='text-2xl font-bold text-white'>
          {post.profile.name}
        </span>
      </div>
      <div className='flex flex-col ml-[91px] mb-7'>
        <h2 className='text-xl font-bold text-white'>{post.title}</h2>
        {post.image ? (
          <img
            className='max-w-xs rounded-lg mb-5'
            src={`http://localhost:9000/${post.description}`}
            alt=''
          />
        ) : (
          <p className='text-base font-normal text-gray-100 mb-5'>
            {post.description}
          </p>
        )}

        <div className='flex w-[236px] justify-between'>
          <button className='flex gap-2 items-center'>
            <Chat size={32} className='text-gray-100' />
            <span className='text-base font-normal text-white'>
              {post.comments.length}
            </span>
          </button>
          <button className='flex gap-2 items-center'>
            <Heart size={32} className='text-gray-100' />
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
