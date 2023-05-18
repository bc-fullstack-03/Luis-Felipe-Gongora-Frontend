import { ScrollRestoration } from 'react-router-dom';
import { Navbar } from '../shared/components';
import { UserCircle } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { api } from '../shared/services/api';
import { getAuthHeader } from '../shared/services/auth';

export const Home = () => {
  useEffect(() => {
    const res = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        await api
          .get('/user', {
            headers: getAuthHeader(),
            params: {
              email: userEmail,
            },
          })
          .then((res) => {
            console.log(res);
          });
      }
    };
    res();
  }, []);

  return (
    <>
      <Navbar />
      <div className='ml-[283px] mt-4'>
        <div className='ml-5 mb-7'>
          <h2 className='text-2xl font-bold text-white mb-[24px]'>
            Página Inicial
          </h2>
          <div className='flex items-center gap-[6px]'>
            <UserCircle size={64} weight='fill' className='text-gray-100' />
            <p className='text-2xl font-bold text-white'>Fulano Silva</p>
          </div>
        </div>
        <hr className='border-b border-secondary' />
      </div>
      <ScrollRestoration />
    </>
  );
};
