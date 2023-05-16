import { Link } from 'react-router-dom';
import { Button, Header, Input } from '../shared/components';
import { EnvelopeSimple, Lock } from '@phosphor-icons/react';

const Login = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header subtitle='Faça login e comece a usar!' />
      <form method='post' className='flex flex-col'>
        <Input
          label='Endereço de e-mail'
          placeholder='Digite seu e-mail'
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
        <Button text='Entrar' className='mb-9 w-[400]' />
      </form>
      <Link to={'/'} className='text-secondary text-sm underline'>
        Não possui conta? Crie uma agora!
      </Link>
    </div>
  );
};

export default Login;
