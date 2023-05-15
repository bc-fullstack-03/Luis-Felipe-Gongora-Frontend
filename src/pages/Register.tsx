import {
  EnvelopeSimple,
  IdentificationCard,
  Lock,
} from '@phosphor-icons/react';
import { Button, Header, Input } from '../shared/components';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header subtitle='Registre-se agora mesmo!' />
      <form>
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
          className='mb-9 pl-[60px]'
        />
        <Button text='Cadastrar' className='mb-9' />
      </form>
      <Link to={'/'} className='text-secondary text-sm underline'>
        Já é cadastro? Faça login agora!
      </Link>
    </div>
  );
};
