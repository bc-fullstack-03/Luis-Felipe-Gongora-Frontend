import {
  EnvelopeSimple,
  IdentificationCard,
  Lock,
} from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { Button, Header, Input } from '../shared/components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../shared/hooks/useForm';
import { Api } from '../shared/services/Api';

export const SignUp = () => {
  const navigate = useNavigate();

  const initialState = {
    email: '',
    password: '',
    name: '',
  };

  const handleSubmmit = async () => {
    try {
      await Api.post('/user/create', values);
      navigate('/login?sucess=1');
    } catch (e: unknown) {
      if (typeof e === 'string') {
        toast.error(e.toUpperCase());
      } else if (e instanceof AxiosError) {
        toast.error(e.response?.data.message);
      }
    }
  };

  const { onChange, onSubmit, values } = useForm(handleSubmmit, initialState);

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header subtitle='Registre-se agora mesmo!' />
      <form onSubmit={onSubmit}>
        <Input
          label='Endereço de e-mail'
          placeholder='Digite um e-mail válido'
          inputType='email'
          icon={
            <EnvelopeSimple
              size={24}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          name='email'
          onChange={onChange}
          required
          className='mb-3'
        />
        <Input
          label='Seu nome'
          placeholder='Ex: João Carlos'
          inputType='text'
          icon={
            <IdentificationCard
              size={24}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          name='name'
          onChange={onChange}
          required
          className='mb-3 pl-[60px]'
        />
        <Input
          label='Sua senha'
          placeholder='*********'
          inputType='password'
          icon={
            <Lock
              size={32}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          name='password'
          onChange={onChange}
          required
          className='mb-9 pl-[60px]'
        />
        <Button text='Cadastrar' className='mb-9 w-[400px]' type='submit' />
      </form>
      <Link to={'/login'} className='text-secondary text-sm underline'>
        Já é cadastro? Faça login agora!
      </Link>
      <ToastContainer theme='dark' />
    </div>
  );
};
