import { toast } from 'react-toastify';
import { FormEvent, useState } from 'react';
import { XCircle } from '@phosphor-icons/react';

import { api } from '../../services/api';
import { Post } from '../../../models/Post';
import { Button, Dropzone, Forms } from '..';
import { getAuthHeader } from '../../services/auth';

interface ModalProps {
  handleModal: () => void;
  modal: boolean;
  updatePosts: (post: Post) => void;
}

interface PostFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement {
  readonly elements: PostFormElements;
}

export const ModalPost = ({ handleModal, modal, updatePosts }: ModalProps) => {
  const [selectedFile, setSelectedFileUrl] = useState<File | undefined>();

  const closeModal = () => {
    handleModal();
  };

  const handleSubmit = async (e: FormEvent<PostFormElement>) => {
    e.preventDefault();

    const authHeader = getAuthHeader();

    const form = e.currentTarget;
    const formData = new FormData();

    formData.append('title', form.elements.title.value);
    formData.append('description', form.elements.description.value);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const { data } = await api.post('/posts', formData, authHeader);
      updatePosts(data);
      closeModal();
      form.elements.description.value = '';
      form.elements.title.value = '';
    } catch (e: unknown) {
      toast.error(
        'Falha ao criar o post, verifique se o título e a descrição não estão vazios!'
      );
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center flex-col gap-2 w-screen h-screen bg-black-900 opacity-[0.99] ${
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
      <Forms
        formClassName='flex flex-col'
        handleSubmit={handleSubmit}
        submitFormButtonText='Criar'
        children={<Dropzone onFileUploaded={setSelectedFileUrl} />}
        newPost
        closeModal={closeModal}
      />
    </div>
  );
};
