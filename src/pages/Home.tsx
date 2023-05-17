import { ScrollRestoration } from 'react-router-dom';
import { Navbar } from '../shared/components';

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className='ml-[303px] mt-4'>
        <h2 className='text-2xl font-bold text-white'>Página Inicial</h2>
      </div>
      <ScrollRestoration />
    </>
  );
};
