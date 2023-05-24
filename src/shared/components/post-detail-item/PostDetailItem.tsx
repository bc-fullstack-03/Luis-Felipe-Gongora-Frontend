import { UserCircle } from '@phosphor-icons/react';
import { Forms, PostItem } from '..';
import { Post } from '../../../models/Post';
import { likePost, unlikePost } from '../../services/Posts';
import { ToastContainer, toast } from 'react-toastify';
import { FormEvent } from 'react';
import { api } from '../../services/api';
import { getAuthHeader } from '../../services/auth';

interface PostDetailItemProps {
  post: Post;
  setPostDetail: (post: Post) => void;
}

interface CommentFormElements extends HTMLFormControlsCollection {
  description: HTMLInputElement;
}

interface CommentFormElement extends HTMLFormElement {
  readonly elements: CommentFormElements;
}

export const PostDetailItem = ({
  post,
  setPostDetail,
}: PostDetailItemProps) => {
  const userId = localStorage.getItem('profile') as string;

  const handleLike = async () => {
    try {
      if (post?.likes.includes(userId)) {
        const newPost = await unlikePost(post, userId);
        setPostDetail({ ...newPost });
      } else {
        const newPost = await likePost(post, userId);
        setPostDetail({ ...newPost });
      }
    } catch (err) {
      toast.error('Erro ao realizar o like!', {
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  const handleSaveComment = async (e: FormEvent<CommentFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      description: form.elements.description.value,
    };

    try {
      await api.post(`/posts/${post._id}/comments`, data, getAuthHeader());
      const res = await api.get(`/posts/${post._id}`, getAuthHeader());
      setPostDetail(res.data);
      form.description.value = '';
    } catch (err) {
      toast.error('Erro ao realizar o comentário!', {
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <>
      {post && <PostItem post={post} handleLike={handleLike} />}
      <Forms
        handleSubmit={handleSaveComment}
        submitFormButtonText='Comentar'
        formClassName='ml-[303px] mt-4'
        newComment
      />
      <section className='ml-[283px] mt-4 w-[568px]'>
        <h2 className='ml-5 text-2xl font-bold text-white'>Comentários</h2>
        <ul className='ml-4'>
          {post.comments &&
            post.comments.map((comment) => (
              <li
                className='my-5 p-2 border border-gray-50 rounded-lg '
                key={comment._id}
              >
                <div className='flex items-center gap-2'>
                  <UserCircle
                    size={32}
                    weight='light'
                    className='text-gray-100'
                  />
                  <span className='text-sm font-bold text-white'>
                    {comment.profile.name}
                  </span>
                </div>
                <span className='text-base text-gray-50 ml-6'>
                  {comment.description}
                </span>
              </li>
            ))}
        </ul>
      </section>
      <ToastContainer theme='dark' />
    </>
  );
};
