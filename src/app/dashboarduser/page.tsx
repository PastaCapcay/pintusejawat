import { Metadata } from 'next';
import { Overview } from '@/components/dashboard/overview-user';

export const metadata: Metadata = {
  title: 'Dashboard User'
};

export default function DashboardUserPage() {
  return (
    <div className='flex-1 space-y-4 p-4 pt-6'>
      <Overview />
    </div>
  );
}
