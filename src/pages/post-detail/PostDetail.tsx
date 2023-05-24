import { useEffect, useState } from 'react';
import { Navbar, PageHeader, PostDetailItem } from '../../shared/components';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Post } from '../../models/Post';
import { api } from '../../shared/services/api';
import { getAuthHeader } from '../../shared/services/auth';

export const PostDetail = () => {
  const { postId } = useParams();

  const [postDetail, setPostDetail] = useState<Post>();

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const { data } = await api.get(`/posts/${postId}`, getAuthHeader());
        setPostDetail(data);
      } catch (err) {
        toast.error('Erro ao obter os detalhes do post!', {
          autoClose: 2500,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    };

    getPostDetail();
  }, []);
  return (
    <>
      <Navbar />
      <PageHeader title='Detalhe do post' />
      {postDetail && (
        <PostDetailItem post={postDetail} setPostDetail={setPostDetail} />
      )}
      <ToastContainer theme='dark' />
    </>
  );
};
