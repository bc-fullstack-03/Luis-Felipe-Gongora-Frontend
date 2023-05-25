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
  onChange?: () => void;
  errorInput?: boolean;
  infoError?: boolean;
  errorInputTitle?: boolean;
  infoErrorTitle?: boolean;
  textErrorEmail?: string;
  textErrorPassword?: string;
  textErrorName?: string;
  textErrorTitle?: string;
  textError?: string;
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
  onChange,
  errorInput,
  errorInputTitle,
  infoErrorTitle,
  textErrorName,
  textErrorPassword,
  textErrorEmail,
  textErrorTitle,
  textError,
  infoError,
}: FormsProps<T>) => {
  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      {signIn && (
        <>
          <Input
            label='Endereço de e-mail'
            placeholder='Digite seu e-mail'
            type='string'
            name='user'
            icon={
              <EnvelopeSimple
                size={24}
                className='pointer-events-none absolute top-6 transform -translate-y-1/2 left-4 text-secondary'
              />
            }
            className='mb-3'
            required
            errorInput={errorInput}
            onChange={onChange}
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
            errorInput={errorInput}
            onChange={onChange}
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
            type='string'
            required
            className='mb-3'
            errorInput={errorInput}
            onChange={onChange}
            infoError={infoError}
            textError={textErrorEmail}
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
            errorInput={errorInput}
            onChange={onChange}
            infoError={infoError}
            textError={textErrorName}
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
            errorInput={errorInput}
            onChange={onChange}
            infoError={infoError}
            textError={textErrorPassword}
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
            errorInput={errorInputTitle}
            onChange={onChange}
            infoError={infoErrorTitle}
            textError={textErrorTitle}
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
            errorInput={errorInput}
            onChange={onChange}
            infoError={infoError}
            textError={textError}
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
          errorInput={errorInput}
          onChange={onChange}
          infoError={infoError}
          textError={textError}
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
