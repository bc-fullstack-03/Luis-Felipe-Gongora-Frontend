import {
  ChatText,
  EnvelopeSimple,
  IdentificationCard,
  Lock,
  NewspaperClipping,
} from '@phosphor-icons/react';
import { FormEvent, ReactNode } from 'react';

import { Button, Input } from '..';

interface FormsProps<T extends HTMLFormElement> {
  handleSubmit: (e: FormEvent<T>) => void;
  formClassName?: string;
  submitFormButtonText: string;
  signIn?: boolean;
  signUp?: boolean;
  newPost?: boolean;
  newComment?: boolean;
  children?: ReactNode;
  closeModal?: () => void;
}

export const Forms = <T extends HTMLFormElement>({
  submitFormButtonText,
  formClassName,
  handleSubmit,
  signIn,
  signUp,
  newPost,
  children,
  closeModal,
  newComment,
}: FormsProps<T>) => {
  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      {signIn && (
        <>
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
        </>
      )}
      {signUp && (
        <>
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
        </>
      )}
      {newPost && (
        <>
          <Input
            icon={
              <NewspaperClipping
                size={24}
                weight='fill'
                className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
              />
            }
            label='Titulo'
            placeholder='Título do post'
            className='mb-3'
            name='title'
            type='string'
          />
          <Input
            icon={
              <NewspaperClipping
                size={24}
                weight='fill'
                className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
              />
            }
            label='Descrição'
            placeholder='Descrição do post'
            name='description'
            className='mb-3'
            type='string'
          />
          {children}
        </>
      )}
      {newComment && (
        <Input
          icon={
            <ChatText
              size={24}
              weight='fill'
              className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
            />
          }
          label='Insira seu comentário'
          placeholder='Comente este post...'
          name='description'
          type='string'
          newComment
          className='mb-3'
        />
      )}
      <Button
        text={submitFormButtonText}
        className={`${newPost || newComment ? 'mb-3' : 'mb-9'} ${
          newComment ? 'w-[550px]' : 'w-[400px]'
        }`}
        type='submit'
      />
      {newPost && (
        <Button
          type='button'
          onClick={closeModal}
          text='Fechar'
          className='w-[400px] bg-secondary rounded'
          defaultB
        />
      )}
    </form>
  );
};
