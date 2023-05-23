import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { House, User, UsersThree } from '@phosphor-icons/react';

import { Button, ModalPost } from '..';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../../assets/images/parrot-nav.svg';

interface NavbarProps {
  handleUpdatePosts?: () => void;
}

export const Navbar = ({ handleUpdatePosts }: NavbarProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModal = () => {
    setShowModal((state) => !state);
  };

  const updatePosts = () => {
    if (handleUpdatePosts) handleUpdatePosts();
    toast.success('Post criado com sucesso!', {
      autoClose: 2500,
      closeOnClick: true,
      pauseOnHover: false,
    });
  };
  return (
    <>
      <div className='fixed top-0 w-[283px] h-screen border-r border-r-secondary'>
        <div className='flex flex-col ml-5 mt-14 gap-10 w-56'>
          <ul className='flex flex-col gap-10'>
            <li className='flex items-center gap-6'>
              <img src={logo} alt='logo' className='h-[76px] text-gray-100' />
              <p className='text-white text-2xl font-bold'>Show-Us</p>
            </li>
            <li>
              <NavLink
                to='/'
                end
                className={({ isActive, isPending }): string =>
                  isPending
                    ? 'text-white text-2xl font-bold flex items-center gap-3 rounded-full hover:bg-primary [&>*]:hover:text-black-900 hover:text-black-900'
                    : isActive
                    ? 'text-2xl font-bold flex items-center gap-3 rounded-full bg-primary  [&>*]:text-black-900 text-black-900'
                    : 'text-white text-2xl font-bold flex items-center gap-3 rounded-full hover:bg-primary [&>*]:hover:text-black-900 hover:text-black-900'
                }
              >
                <House weight='fill' size={48} className='text-gray-100' />
                Página Inicial
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/profile'
                end
                className={({ isActive, isPending }): string =>
                  isPending
                    ? 'text-white text-2xl font-bold flex items-center gap-3 rounded-full hover:bg-primary [&>*]:hover:text-black-900 hover:text-black-900'
                    : isActive
                    ? 'text-2xl font-bold flex items-center gap-3 rounded-full bg-primary  [&>*]:text-black-900 text-black-900'
                    : 'text-white text-2xl font-bold flex items-center gap-3 rounded-full hover:bg-primary [&>*]:hover:text-black-900 hover:text-black-900'
                }
              >
                <User
                  weight='fill'
                  size={48}
                  className='text-gray-100 group-hover:text-black-900'
                />
                Perfil
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/friends'
                end
                className={({ isActive, isPending }): string =>
                  isPending
                    ? 'text-white text-2xl font-bold flex items-center gap-3 rounded-full hover:bg-primary [&>*]:hover:text-black-900 hover:text-black-900'
                    : isActive
                    ? 'text-2xl font-bold flex items-center gap-3 rounded-full bg-primary  [&>*]:text-black-900 text-black-900'
                    : 'text-white text-2xl font-bold flex items-center gap-3 rounded-full hover:bg-primary [&>*]:hover:text-black-900 hover:text-black-900'
                }
              >
                <UsersThree
                  weight='fill'
                  size={48}
                  className='text-gray-100 group-hover:text-black-900'
                />
                Amigos
              </NavLink>
            </li>
          </ul>
          <Button onClick={handleModal} text='Novo Post' />
        </div>
      </div>
      <ModalPost
        handleModal={handleModal}
        modal={showModal}
        updatePosts={updatePosts}
      />
      <ToastContainer theme='dark' />
    </>
  );
};
