import { NavLink, ScrollRestoration } from 'react-router-dom';
import logo from '../../assets/images/parrot-nav.svg';
import { House, User, UsersThree } from '@phosphor-icons/react';
import { Button } from '.';

export const Navbar = () => {
  return (
    <div className='fixed top-0 w-[284px] h-screen border-r border-r-secondary'>
      <div className='flex flex-col ml-5 mt-14 gap-10 w-56'>
        <ul className='flex flex-col gap-10'>
          <li className='flex items-center gap-6'>
            <img src={logo} alt='logo' className='h-[76px] text-gray-100' />
            <p className='text-white text-2xl font-bold'>Show-Us</p>
          </li>
          <li>
            <NavLink
              to='/'
              className='text-white text-2xl font-bold flex items-center gap-3'
            >
              <House weight='fill' size={48} className='text-gray-100' />
              Página Inicial
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/'
              className='text-white text-2xl font-bold flex items-center gap-3'
            >
              <User weight='fill' size={48} className='text-gray-100' />
              Perfil
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/'
              className='text-white text-2xl font-bold flex items-center gap-3'
            >
              <UsersThree weight='fill' size={48} className='text-gray-100' />
              Amigos
            </NavLink>
          </li>
        </ul>
        <Button text='Novo Post' />
      </div>
      <ScrollRestoration />
    </div>
  );
};
