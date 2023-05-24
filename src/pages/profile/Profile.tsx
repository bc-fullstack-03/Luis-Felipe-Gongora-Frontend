import { useEffect, useState } from 'react';

import { Post } from '../../models/Post';
import { api } from '../../shared/services/api';
import { ToastContainer, toast } from 'react-toastify';
import { UserProfile } from '../../models/UserProfile';
import { getAuthHeader } from '../../shared/services/auth';
import {
  Navbar,
  PageHeader,
  PostItem,
  UserInfo,
} from '../../shared/components';
import { likePost, unlikePost } from '../../shared/services/Posts';

export const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>();
  const [posts, setPosts] = useState<Post[]>([]);

  const authHeader = getAuthHeader();
  const userId = localStorage.getItem('profile') as string;
  const user = localStorage.getItem('user');

  const getProfile = async () => {
    try {
      const { data } = await api.get(`/profiles/${userId}`, authHeader);
      setProfile(data);
    } catch (e: unknown) {
      toast.error('Erro ao atualizar o perfil!', {
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  const getPosts = async () => {
    try {
      const { data } = await api.get('/feed', authHeader);
      setPosts(data.filter((post: Post) => post.profile._id === userId));
    } catch (e: unknown) {
      toast.error('Erro ao atualizar o feed!');
    }
  };

  const handleLike = async (postId: string) => {
    const [post] = posts.filter((post) => post._id === postId);
    try {
      if (post && !post.likes.includes(userId)) {
        const newPost = await likePost(post, userId);
        changePosts(newPost);
      } else {
        const newPost = await unlikePost(post, userId);
        changePosts(newPost);
      }
    } catch (err) {
      toast.error('Erro ao tentar realizar o like!', {
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  function changePosts(newPost: Post) {
    setPosts((posts) => {
      const index = posts.indexOf(newPost);
      posts[index] = newPost;
      return [...posts];
    });
  }

  useEffect(() => {
    getProfile();
    getPosts();
  }, []);
  return (
    <>
      <Navbar />
      <PageHeader title='Meu Perfil' />
      <UserInfo profile={profile} user={user} />
      <div className='flex justify-between mr-5'>
        <h2 className='text-2xl font-bold text-white mt-4 ml-[303px]'>
          Meus Posts
        </h2>
      </div>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} handleLike={handleLike} />
      ))}
      <ToastContainer theme='dark' />
    </>
  );
};
