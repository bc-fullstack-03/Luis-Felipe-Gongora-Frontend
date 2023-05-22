import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { EnvelopeSimple, Lock } from '@phosphor-icons/react';

import { api } from '../../shared/services/api';
import { useForm } from '../../shared/hooks/useForm';
import { Button, Header, Input } from '../../shared/components';
interface DecodedToken {
  user: string;
  profile: string;
}

export const SignIn = () => {
  const navigate = useNavigate();

  const initialState = {
    user: '',
    password: '',
  };

  const handleSubmmit = async () => {
    try {
      await api.post('/security/login', values).then((res) => {
        toast.success('Bem vindo ao Show-Us!');
        const decodedToken = jwtDecode(res.data.accessToken) as DecodedToken;
        localStorage.setItem('user', decodedToken.user);
        localStorage.setItem('profile', decodedToken.profile);
        localStorage.setItem('token', res.data.accessToken);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      });
    } catch (e: unknown) {
      toast.error('Erro ao fazer login, verifique seu e-mail e password!');
    }
  };

  const { onChange, onSubmit, values } = useForm(handleSubmmit, initialState);

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header subtitle='Faça login e comece a usar!' />
      <form onSubmit={onSubmit} className='flex flex-col'>
        <Input
          name='user'
          label='Endereço de e-mail'
          placeholder='Digite seu e-mail'
          inputType='user'
          icon={
            <EnvelopeSimple
              size={24}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          className='mb-3'
          required
          onChange={onChange}
        />
        <Input
          name='password'
          label='Sua senha'
          placeholder='*********'
          inputType='password'
          icon={
            <Lock
              size={32}
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          className='mb-9 pl-[60px]'
          required
          onChange={onChange}
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
