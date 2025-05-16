import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import ProfileViewPage from '@/features/profile/components/profile-view-page';

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
        <div className='overflow-hidden rounded-lg border bg-background shadow'>
          <ProfileViewPage />
        </div>
      </div>
    </PageContainer>
  );
}
