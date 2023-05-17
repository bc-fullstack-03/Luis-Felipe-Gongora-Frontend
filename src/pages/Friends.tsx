import { ScrollRestoration } from 'react-router-dom';
import { Navbar } from '../shared/components';

export const Friends = () => {
  return (
    <>
      <Navbar />
      <div className='ml-[303px] mt-4'>
        <h2 className='text-2xl font-bold text-white'>Amigos</h2>
      </div>
      <ScrollRestoration />
    </>
  );
};
