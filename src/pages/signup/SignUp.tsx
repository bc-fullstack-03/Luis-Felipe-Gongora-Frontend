import {
  EnvelopeSimple,
  IdentificationCard,
  Lock,
} from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { FormEvent } from 'react';

import { Button, Header, Input } from '../../shared/components';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../shared/services/api';

interface SignupFormElements extends HTMLFormControlsCollection {
  user: HTMLInputElement;
  password: HTMLInputElement;
  name: HTMLInputElement;
}

interface SignupFormElement extends HTMLFormElement {
  readonly elements: SignupFormElements;
}

export const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmmit = async (e: FormEvent<SignupFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = {
      user: form.elements.user.value,
      password: form.elements.password.value,
      name: form.elements.name.value,
    };

    try {
      await api.post('/security/register', data);
      toast.success(
        'Usuário Cadastrado com Sucesso! Você sera redirecionado para página de login!'
      );
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (e: unknown) {
      if (typeof e === 'string') {
        toast.error(e.toUpperCase());
      } else if (e instanceof AxiosError) {
        toast.error(e.response?.data.message);
      }
    }
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header subtitle='Registre-se agora mesmo!' />
      <form onSubmit={handleSubmmit}>
        <Input
          label='Endereço de e-mail'
          placeholder='Digite um e-mail válido'
          icon={
            <EnvelopeSimple
              size={24}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          name='user'
          type='email'
          required
          className='mb-3'
        />
        <Input
          label='Seu nome'
          placeholder='Ex: João Carlos'
          icon={
            <IdentificationCard
              size={24}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          name='name'
          type='string'
          required
          className='mb-3 pl-[60px]'
        />
        <Input
          label='Sua senha'
          placeholder='*********'
          icon={
            <Lock
              size={32}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          name='password'
          type='password'
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
