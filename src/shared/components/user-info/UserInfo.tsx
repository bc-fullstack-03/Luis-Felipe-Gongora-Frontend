import {
  EnvelopeSimple,
  IdentificationCard,
  UserCircle,
} from '@phosphor-icons/react';
import { UserProfile } from '../../../models/UserProfile';

interface FriendListProps {
  profile: UserProfile | undefined;
  user: string | null;
}

export const UserInfo = ({ profile, user }: FriendListProps) => {
  return (
    <div className='ml-[283px]'>
      <div className='flex flex-col justify-center items-center mb-5'>
        <UserCircle size={160} weight='fill' className='text-gray-100' />
        <div className='flex items-center gap-1'>
          <IdentificationCard
            size={48}
            weight='fill'
            className='text-gray-100'
          />
          <span className='text-xl font-bold text-white'>{profile?.name}</span>
        </div>
        <div className='flex items-center gap-1'>
          <EnvelopeSimple size={48} weight='fill' className='text-gray-100' />
          <span className='text-xl font-bold text-white'>{user}</span>
        </div>
      </div>
      <hr className='border-b border-secondary' />
    </div>
  );
};
