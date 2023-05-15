import { ScrollRestoration } from 'react-router-dom';
import { Body, Header } from '../shared/components';

const Login = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <Header />
      <Body />
      <ScrollRestoration />
    </div>
  );
};

export default Login;
