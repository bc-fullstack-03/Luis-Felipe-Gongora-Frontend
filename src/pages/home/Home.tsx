import { useEffect, useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Post } from '../../models/Post';
import { api } from '../../shared/services/api';
import { UserProfile } from '../../models/UserProfile';
import { getAuthHeader } from '../../shared/services/auth';
import { Navbar, PostItem, PageHeader } from '../../shared/components';
import { likePost, unlikePost } from '../../shared/services/Posts';

export const Home = () => {
  const [userName, setUserName] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<UserProfile | undefined>();

  const authHeader = getAuthHeader();
  const userEmail = localStorage.getItem('user') as string;
  const userId = localStorage.getItem('profile') as string;

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
      if (!localStorage.getItem('welcome')) {
        toast.success(`Bem vindo ${data.profile.name}!`, {
          autoClose: 2500,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
      setProfile({
        _id: data.profile.user,
        name: data.profile.name,
        followers: data.profile.followers,
        following: data.profile.following,
      });
      localStorage.setItem('welcome', 'true');
    } catch (e: unknown) {
      toast.error('Erro ao obter o profile do usuário');
    }
  };

  const handleUpdatePosts = (post: Post) => {
    post = {
      ...post,
      profile: {
        _id: profile?._id ?? '',
        name: profile?.name ?? userId,
        user: userEmail,
      },
    };
    post.description = `http://localhost:9000/${post.description}`;
    setPosts((posts) => [post, ...posts]);
    toast.success('Post criado com sucesso!', {
      autoClose: 2500,
      closeOnClick: true,
      pauseOnHover: false,
    });
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
      <Navbar updatePosts={handleUpdatePosts} />
      <PageHeader userInfo hr title='Página Inicial' userName={userName} />
      {posts.map((post) => (
        <PostItem key={post._id} post={post} handleLike={handleLike} />
      ))}
      <ScrollRestoration />
      <ToastContainer theme='dark' />
    </>
  );
};
