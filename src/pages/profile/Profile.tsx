import { useEffect, useState } from 'react';

import { Post } from '../../models/Post';
import { api } from '../../shared/services/api';
import { ToastContainer, toast } from 'react-toastify';
import { UserProfile } from '../../models/UserProfile';
import { getAuthHeader } from '../../shared/services/auth';
import { FriendList, Navbar, PageHeader, Posts } from '../../shared/components';

export const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>();
  const [posts, setPosts] = useState<Post[]>([]);

  const authHeader = getAuthHeader();
  const profileId = localStorage.getItem('profile');
  const user = localStorage.getItem('user');

  const getProfile = async () => {
    try {
      const { data } = await api.get(`/profiles/${profileId}`, authHeader);
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
      setPosts(data.filter((post: Post) => post.profile._id === profileId));
    } catch (e: unknown) {
      toast.error('Erro ao atualizar o feed!');
    }
  };

  useEffect(() => {
    getProfile();
    getPosts();
  }, []);
  return (
    <>
      <Navbar />
      <PageHeader title='Perfil' />
      <FriendList profile={profile} user={user} />
      <div className='flex justify-between mr-5'>
        <h2 className='text-2xl font-bold text-white mt-4 ml-[303px]'>
          Meus Posts
        </h2>
      </div>
      {posts.map((post) => (
        <Posts key={post._id} post={post} />
      ))}
      <ToastContainer theme='dark' />
    </>
  );
};
