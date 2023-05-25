import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { api } from '../../shared/services/api';
import { Forms, Header } from '../../shared/components';

interface SignUpFormElements extends HTMLFormControlsCollection {
  user: HTMLInputElement;
  password: HTMLInputElement;
  name: HTMLInputElement;
}

interface SignUpFormElement extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<boolean>();

  const handleSubmit = async (e: FormEvent<SignUpFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = {
      user: form.elements.user.value,
      password: form.elements.password.value,
      name: form.elements.name.value,
    };
    if (
      data.user.trim().length &&
      data.password.trim().length &&
      data.name.trim().length >= 3
    ) {
      try {
        await api.post('/security/register', data);
        navigate('/login');
        localStorage.setItem('new', 'user');
      } catch (e: unknown) {
        toast.error(
          'Erro ao criar usuário! Verifique os itens marcados com *',
          {
            autoClose: 2500,
            closeOnClick: true,
            pauseOnHover: false,
          }
        );
        setFormError(true);
        form.elements.password.value = '';
      }
    } else {
      setFormError(true);
      toast.error('Erro ao criar usuário! Verifique os itens marcados com *', {
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
      form.elements.password.value = '';
    }
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header subtitle='Registre-se agora mesmo!' />
      <Forms
        handleSubmit={handleSubmit}
        submitFormButtonText='Cadastrar'
        signUp
        errorInput={formError}
        infoError={formError}
        textErrorEmail='* Coloque um e-mail válido! *'
        textErrorName='* Nome deve conter no mínimo 3 caracteres! *'
        textErrorPassword='* Senha deve conter no mínimo 3 caracteres! *'
        onChange={() => setFormError(false)}
      />
      <Link to={'/login'} className='text-secondary text-sm underline'>
        Já é cadastro? Faça login agora!
      </Link>
      <ToastContainer theme='dark' />
    </div>
  );
};
