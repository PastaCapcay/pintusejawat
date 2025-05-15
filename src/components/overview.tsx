import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Trophy } from 'lucide-react';

export function Overview() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Total Paket Soal
          </CardTitle>
          <BookOpen className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>15</div>
          <p className='text-muted-foreground text-xs'>
            Paket soal yang tersedia
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Pengguna</CardTitle>
          <GraduationCap className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>250</div>
          <p className='text-muted-foreground text-xs'>Pengguna aktif</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Tryout</CardTitle>
          <Trophy className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>10</div>
          <p className='text-muted-foreground text-xs'>Tryout yang tersedia</p>
        </CardContent>
      </Card>
    </div>
  );
}
