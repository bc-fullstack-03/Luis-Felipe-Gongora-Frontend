import jwtDecode from 'jwt-decode';
import { useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { api } from '../../shared/services/api';
import { Forms, Header } from '../../shared/components';

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

  const handleSubmit = async (e: FormEvent<SigninFormElement>) => {
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

  useEffect(() => {
    if (localStorage.getItem('new')) {
      toast.success('Usuário Cadastrado com Sucesso!', {
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
      localStorage.removeItem('new');
    }
  }, []);

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header subtitle='Faça login e comece a usar!' />
      <Forms handleSubmit={handleSubmit} signIn submitFormButtonText='Entrar' />
      <Link to={'/register'} className='text-secondary text-sm underline'>
        Não possui conta? Crie uma agora!
      </Link>
      <ToastContainer theme='dark' />
    </div>
  );
};
