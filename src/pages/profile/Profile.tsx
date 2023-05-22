import { useEffect, useState } from 'react';
import { Navbar, PageHeader } from '../../shared/components';
import { getAuthHeader } from '../../shared/services/auth';
import { api } from '../../shared/services/api';
import { ToastContainer, toast } from 'react-toastify';
import {
  EnvelopeSimple,
  IdentificationCard,
  UserCircle,
  UserCircleMinus,
  UserRectangle,
  UsersThree,
} from '@phosphor-icons/react';
import { UserProfile } from '../../models/UserProfile';

export const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>();

  const authHeader = getAuthHeader();
  const profileId = localStorage.getItem('profile');
  const user = localStorage.getItem('user');
  const getProfile = async () => {
    try {
      const { data } = await api.get(`/profiles/${profileId}`, authHeader);
      setProfile(data);
    } catch (e: unknown) {
      toast.error('Erro ao atualizar o perfil!');
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <Navbar />
      <PageHeader title='Perfil' />
      <div className='ml-[283px]'>
        <div className='flex flex-col justify-center items-center mb-5'>
          <UserCircle size={160} weight='fill' className='text-gray-100' />
          <div className='flex items-center gap-1'>
            <IdentificationCard
              size={48}
              weight='fill'
              className='text-gray-100'
            />
            <span className='text-xl font-bold text-white'>
              {profile?.name}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <EnvelopeSimple size={48} weight='fill' className='text-gray-100' />
            <span className='text-xl font-bold text-white'>{user}</span>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2 mb-5'>
          <div className='flex flex-col gap-5 rounded-3xl border border-primary p-5 ml-1'>
            <div className='flex w-full gap-3 items-center justify-center bg-primary p-2 rounded-full'>
              <UsersThree size={32} weight='fill' className='text-black' />
              <span className='text-xl font-bold text-black'>Seguindo</span>
            </div>
            {profile?.following.length == 0 ? (
              <div className='flex justify-center items-center text-red font-bold'>
                <span>Você nao segue ninguem!</span>
              </div>
            ) : (
              profile?.following.map((f) => (
                <div className='flex w-full h-full gap-1 items-center justify-center shadow-sm shadow-black-900 rounded-3xl hover:bg-black-600'>
                  <UserRectangle
                    size={128}
                    weight='fill'
                    className='text-gray-100'
                  />
                  <div className='flex justify-center items-center gap-5'>
                    <div className='flex flex-col'>
                      <button className='text-xl font-bold text-white'>
                        {f.name}
                      </button>
                      <span className='text-xs font-normal text-gray-100'>
                        {f.followers.length} Seguidores
                      </span>
                      <span className='text-xs font-normal text-gray-100'>
                        Seguindo {f.following.length}
                      </span>
                    </div>
                    <button>
                      <UserCircleMinus
                        size={24}
                        weight='fill'
                        className='text-red'
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className='flex flex-col gap-5 rounded-3xl border border-primary p-5 mr-1'>
            <div className='flex w-full gap-3 items-center justify-center bg-primary p-2 rounded-full'>
              <span className='text-xl font-bold text-black'>Seguidores</span>
              <UsersThree size={32} weight='fill' className='text-black' />
            </div>
            {profile?.followers.length == 0 ? (
              <div className='flex justify-center items-center text-red font-bold'>
                <span>Você nao é seguido por ninguem!</span>
              </div>
            ) : (
              profile?.followers.map((f) => (
                <div className='flex w-full h-full gap-1 items-center justify-center shadow-sm shadow-black-900 rounded-3xl hover:bg-black-600'>
                  <UserRectangle
                    size={128}
                    weight='fill'
                    className='text-gray-100'
                  />
                  <div className='flex justify-center items-center gap-5'>
                    <div className='flex flex-col'>
                      <button className='text-xl font-bold text-white'>
                        {f.name}
                      </button>
                      <span className='text-xs font-normal text-gray-100'>
                        {f.followers.length} Seguidores
                      </span>
                      <span className='text-xs font-normal text-gray-100'>
                        Seguindo {f.following.length}
                      </span>
                    </div>
                    <button>
                      <UserCircleMinus
                        size={24}
                        weight='fill'
                        className='text-red'
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
