import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}

export const Dropzone = ({ onFileUploaded }: DropzoneProps) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const fileURL = URL.createObjectURL(file);
      setSelectedFileUrl(fileURL);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className='flex justify-center items-center mt-4 mb-9'
      {...getRootProps()}
    >
      <input name='file' {...getInputProps()} />
      {selectedFileUrl ? (
        <img
          src={selectedFileUrl}
          alt='Post image'
          className='max-h-96 rounded-lg'
        />
      ) : (
        <span className='text-white text-center text-sm w-[400px]'>
          Arraste a imagem para cá ou clique aqui para selecionar a imagem!
        </span>
      )}
    </div>
  );
};
