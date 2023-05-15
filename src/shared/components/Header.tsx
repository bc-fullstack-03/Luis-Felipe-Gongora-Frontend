import logo from '../../assets/images/parrot-logo.svg';

export function Header() {
  return (
    <>
      <header className='flex flex-col justify-center items-center text-gray-50 mb-12'>
        <img src={logo} alt='logo' className='mb-4' />
        <h1 className='font-bold text-[32px]'>Sysmap Show-Us</h1>
        <p className='text-lg text-secondary'>Faça login e comece a usar!</p>
      </header>
    </>
  );
}
