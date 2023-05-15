import { Button, Input } from '.';
import { EnvelopeSimple, Lock } from '@phosphor-icons/react';

export const Form = () => {
  return (
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
      <Button text='Entrar' className='mb-9' />
    </form>
  );
};
