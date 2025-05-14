import { UserProfile } from '@clerk/nextjs';
import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User Profile Page'
};

export default function ProfilePage() {
  return (
    <PageContainer>
      <div className='flex flex-col space-y-8'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Profile</h2>
            <p className='text-muted-foreground'>
              Manage your profile settings
            </p>
          </div>
        </div>
        <div className='bg-background overflow-hidden rounded-lg border shadow'>
          <UserProfile routing='path' path='/dashboarduser/profile' />
        </div>
      </div>
    </PageContainer>
  );
}
