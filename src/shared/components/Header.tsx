import logo from '../../assets/images/parrot-logo.svg';

interface HeaderProps {
  subtitle: string;
}

export const Header = ({ subtitle }: HeaderProps) => {
  return (
    <>
      <header className='flex flex-col justify-center items-center text-gray-50 mb-12'>
        <img src={logo} alt='logo' className='mb-4' />
        <h1 className='font-bold text-[32px]'>Sysmap Show-Us</h1>
        <p className='text-lg text-secondary'>{subtitle}</p>
      </header>
    </>
  );
};
