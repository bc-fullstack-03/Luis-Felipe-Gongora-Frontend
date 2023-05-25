import { toast } from 'react-toastify';
import { FormEvent, useState } from 'react';

import { Dropzone, Forms } from '..';
import { api } from '../../services/api';
import { Post } from '../../../models/Post';
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
  const [formError, setFormError] = useState<boolean>();
  const [titleError, setTitleError] = useState<boolean>();

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

    if (!selectedFile) {
      if (
        form.elements.title.value.trim().length &&
        form.elements.description.value.trim().length >= 3
      ) {
        try {
          const { data } = await api.post('/posts', formData, authHeader);
          updatePosts(data);
          closeModal();
          form.elements.description.value = '';
          form.elements.title.value = '';
        } catch (e: unknown) {
          toast.error(
            'Falha ao criar o post, verifique os itens marcados com *',
            {
              autoClose: 2500,
              closeOnClick: true,
              pauseOnHover: false,
            }
          );
          setFormError(true);
          setTitleError(true);
        }
      } else {
        setFormError(true);
        setTitleError(true);
        toast.error(
          'Falha ao criar o post, verifique os itens marcados com *',
          {
            autoClose: 2500,
            closeOnClick: true,
            pauseOnHover: false,
          }
        );
      }
    } else if (form.elements.title.value.trim().length >= 3) {
      try {
        const { data } = await api.post('/posts', formData, authHeader);
        updatePosts(data);
        closeModal();
        form.elements.description.value = '';
        form.elements.title.value = '';
      } catch (e: unknown) {
        toast.error(
          'Falha ao criar o post, verifique os itens marcados com *',
          {
            autoClose: 2500,
            closeOnClick: true,
            pauseOnHover: false,
          }
        );
        setTitleError(true);
      }
    } else {
      setTitleError(true);
      toast.error('Falha ao criar o post, verifique os itens marcados com *', {
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center flex-col gap-2 w-screen h-screen bg-black-900 opacity-[0.99] ${
        modal ? '' : 'hidden'
      }`}
    >
      <h2 className='font-bold text-[32px] text-white mb-5'>Novo post</h2>
      <Forms
        formClassName='flex flex-col'
        handleSubmit={handleSubmit}
        submitFormButtonText='Criar'
        children={<Dropzone onFileUploaded={setSelectedFileUrl} />}
        newPost
        closeModal={closeModal}
        errorInput={formError}
        infoError={formError}
        errorInputTitle={titleError}
        infoErrorTitle={titleError}
        textErrorTitle='* O Título deve ter no mínimo 3 letras *'
        textError='* A Descrição deve ter no mínimo 3 letras *'
        onChange={() => {
          setFormError(false);
          setTitleError(false);
        }}
      />
    </div>
  );
};
