import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard User'
};

export default function DashboardPage() {
  return (
    <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          <p className='text-muted-foreground'>
            Selamat datang di dashboard belajar Anda
          </p>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Tryout</CardTitle>
            <GraduationCap className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
            <p className='text-muted-foreground text-xs'>
              Tryout yang telah dikerjakan
            </p>
          </CardContent>
        </Card>

        <Card className='col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Materi Dipelajari
            </CardTitle>
            <BookOpen className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
            <p className='text-muted-foreground text-xs'>
              Materi yang telah dipelajari
            </p>
          </CardContent>
        </Card>

        <Card className='col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Nilai Tertinggi
            </CardTitle>
            <Trophy className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
            <p className='text-muted-foreground text-xs'>
              Nilai tryout tertinggi
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='col-span-full'>
          <CardHeader>
            <CardTitle>Aktivitas Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground text-sm'>Belum ada aktivitas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
