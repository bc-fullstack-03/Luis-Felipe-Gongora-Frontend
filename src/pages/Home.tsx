import { ScrollRestoration } from 'react-router-dom';
import { Navbar, Posts, PageHeader } from '../shared/components';
import { useEffect, useState } from 'react';
import { api } from '../shared/services/api';
import { getAuthHeader } from '../shared/services/auth';
import { ToastContainer, toast } from 'react-toastify';
import { Post } from '../models/Post';

export const Home = () => {
  const [userName, setUserName] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);

  const authHeader = getAuthHeader();
  const getPosts = async () => {
    try {
      const { data } = await api.get('/feed', authHeader);
      setPosts(data);
    } catch (e: unknown) {
      toast.error('Erro ao atualizar o feed!');
    }
  };
  const getProfile = async () => {
    try {
      const { data } = await api.get('/users/me', authHeader);
      setUserName(data.profile.name);
    } catch (e: unknown) {
      toast.error('Erro ao obter o profile do usuário');
    }
  };
  useEffect(() => {
    getProfile();
    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <PageHeader userInfo hr title='Página Inicial' userName={userName} />
      {posts.map((post) => (
        <Posts key={post._id} post={post} />
      ))}
      <ScrollRestoration />
      <ToastContainer />
    </>
  );
};
