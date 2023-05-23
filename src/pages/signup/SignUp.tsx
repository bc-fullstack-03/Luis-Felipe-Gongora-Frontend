import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { api } from '../../shared/services/api';
import { Forms, Header } from '../../shared/components';

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

  const handleSubmit = async (e: FormEvent<SignupFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = {
      user: form.elements.user.value,
      password: form.elements.password.value,
      name: form.elements.name.value,
    };

    try {
      await api.post('/security/register', data);
      navigate('/login');
      localStorage.setItem('new', 'user');
    } catch (e: unknown) {
      toast.error('Erro ao criar usuário!', {
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header subtitle='Registre-se agora mesmo!' />
      <Forms
        handleSubmit={handleSubmit}
        submitFormButtonText='Cadastrar'
        signUp
      />
      <Link to={'/login'} className='text-secondary text-sm underline'>
        Já é cadastro? Faça login agora!
      </Link>
      <ToastContainer theme='dark' />
    </div>
  );
};
