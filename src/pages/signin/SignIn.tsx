import * as yup from 'yup';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { EnvelopeSimple, Lock } from '@phosphor-icons/react';
import { FormEvent } from 'react';

import { api } from '../../shared/services/api';
import { Button, Header, Input } from '../../shared/components';
interface DecodedToken {
  user: string;
  profile: string;
}

interface SigninFormElements extends HTMLFormControlsCollection {
  user: HTMLInputElement;
  password: HTMLInputElement;
}

interface SigninFormElement extends HTMLFormElement {
  readonly elements: SigninFormElements;
}

export const SignIn = () => {
  const navigate = useNavigate();

  const formValidationSchema = yup.object().shape({
    user: yup.string().required().min(3),
    password: yup.string().required().min(3),
  });

  const handleSubmmit = async (e: FormEvent<SigninFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = {
      user: form.elements.user.value,
      password: form.elements.password.value,
    };

    try {
      await api.post('/security/login', data).then((res) => {
        const decodedToken = jwtDecode(res.data.accessToken) as DecodedToken;
        localStorage.setItem('user', decodedToken.user);
        localStorage.setItem('profile', decodedToken.profile);
        localStorage.setItem('token', res.data.accessToken);
        (form.elements.user.value = ''), (form.elements.password.value = '');
        navigate('/');
      });
    } catch (e: unknown) {
      toast.error(
        'Erro ao fazer login. Verifique seu e-mail e password ou se ainda não é registrado cadastre-se agora!',
        {
          autoClose: 2500,
          closeOnClick: true,
          pauseOnHover: false,
        }
      );
      form.elements.password.value = '';
    }
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header subtitle='Faça login e comece a usar!' />
      <form onSubmit={handleSubmmit} className='flex flex-col'>
        <Input
          label='Endereço de e-mail'
          placeholder='Digite seu e-mail'
          type='email'
          name='user'
          icon={
            <EnvelopeSimple
              size={24}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          className='mb-3'
          required
        />
        <Input
          label='Sua senha'
          placeholder='*********'
          type='password'
          name='password'
          icon={
            <Lock
              size={32}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          className='mb-9 pl-[60px]'
          required
        />
        <Button text='Entrar' className='mb-9 w-[400px]' type='submit' />
      </form>
      <Link to={'/register'} className='text-secondary text-sm underline'>
        Não possui conta? Crie uma agora!
      </Link>
      <ToastContainer theme='dark' />
    </div>
  );
};
