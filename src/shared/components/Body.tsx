import { Link } from 'react-router-dom';
import { Form } from '.';

export const Body = () => {
  return (
    <>
      <body className='flex flex-col justify-center items-center'>
        <Form />
        <Link to={'/'} className='text-secondary text-sm underline'>
          Não possui conta? Crie uma agora!
        </Link>
      </body>
    </>
  );
};
