import { NewspaperClipping, XCircle } from '@phosphor-icons/react';
import { Button, Input } from '..';
import { useForm } from '../../hooks/useForm';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { getAuthHeader } from '../../services/auth';

interface ModalProps {
  handleModal: () => void;
  modal: boolean;
  updatePosts: () => void;
}

export const Modal = ({ handleModal, modal, updatePosts }: ModalProps) => {
  const closeModal = () => {
    handleModal();
  };

  const initialState = {
    title: '',
    description: '',
  };

  const handleSubmmit = async () => {
    const authHeader = getAuthHeader();
    try {
      await api.post('/posts', values, authHeader);
      updatePosts();
      toast.success('Post criado com sucesso!');
      setTimeout(() => {
        closeModal();
      }, 2500);
    } catch (e: unknown) {
      toast.error('Falha ao criar o post');
    }
  };

  const { onChange, onSubmit, values } = useForm(handleSubmmit, initialState);
  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center flex-col gap-2 w-screen h-screen bg-black-900 opacity-90 ${
        modal ? '' : 'hidden'
      }`}
    >
      <Button
        onClick={closeModal}
        className='font-semibold h-[39px] active:scale-95 active:duration-200 fixed top-0 right-0 mr-5 mt-5'
        title='Close'
        text={<XCircle size={32} weight='fill' className='text-red' />}
        defaultB
      />
      <h2 className='font-bold text-[32px] text-white mb-5'>Novo post</h2>
      <form onSubmit={onSubmit}>
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
          onChange={onChange}
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
          className='mb-9'
          onChange={onChange}
        />
        <Button type='submit' text='Criar' className='w-[400px]' />
      </form>
    </div>
  );
};
