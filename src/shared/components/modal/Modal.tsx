import { FormEvent, useState } from 'react';
import { NewspaperClipping, XCircle } from '@phosphor-icons/react';
import { Button, Dropzone, Input } from '..';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { getAuthHeader } from '../../services/auth';

interface ModalProps {
  handleModal: () => void;
  modal: boolean;
  updatePosts: () => void;
}

interface PostFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement {
  readonly elements: PostFormElements;
}

export const Modal = ({ handleModal, modal, updatePosts }: ModalProps) => {
  const [selectedFile, setSelectedFileUrl] = useState<File | undefined>();

  const closeModal = () => {
    handleModal();
  };

  const handleSubmmit = async (e: FormEvent<PostFormElement>) => {
    e.preventDefault();

    const authHeader = getAuthHeader();

    const form = e.currentTarget;
    const data = new FormData();

    data.append('title', form.elements.title.value);
    data.append('description', form.elements.description.value);
    if (selectedFile) {
      data.append('file', selectedFile);
    }

    try {
      await api.post('/posts', data, authHeader);
      updatePosts();
      toast.success('Post criado com sucesso!');
      setTimeout(() => {
        closeModal();
      }, 2500);
    } catch (e: unknown) {
      toast.error('Falha ao criar o post');
    }
  };
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
      <form onSubmit={handleSubmmit}>
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
        <Dropzone onFileUploaded={setSelectedFileUrl} />
        <Button type='submit' text='Criar' className='w-[400px]' />
      </form>
    </div>
  );
};
