import { UserCircle } from '@phosphor-icons/react';
import { Button } from '.';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  userName?: string;
  title: string;
  className?: string;
  userInfo?: boolean;
  hr?: boolean;
}

export const PageHeader = ({
  userName,
  title,
  userInfo,
  hr,
  className,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <header className={`ml-[283px] mt-4 ${className}`}>
      <div className='ml-5 mb-7'>
        <div className='flex justify-between mr-5'>
          <h1 className='text-2xl font-bold text-white mb-[24px]'>{title}</h1>
          <Button onClick={logout} className='p-2 rounded-full' text='Logout' />
        </div>
        {userInfo && (
          <div className='flex items-center gap-[6px]'>
            <UserCircle size={64} weight='fill' className='text-gray-100' />
            <span className='text-2xl font-bold text-white'>{userName}</span>
          </div>
        )}
      </div>
      {hr && <hr className='border-b border-secondary' />}
    </header>
  );
};
