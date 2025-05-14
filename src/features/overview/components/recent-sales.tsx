import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

const tryoutData = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
    fallback: 'OM',
    tryout: 'Tryout UTBK 1',
    score: 85
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
    fallback: 'JL',
    tryout: 'Tryout UTBK 2',
    score: 92
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/3.png',
    fallback: 'IN',
    tryout: 'Tryout UTBK 1',
    score: 78
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'WK',
    tryout: 'Tryout UTBK 3',
    score: 88
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/5.png',
    fallback: 'SD',
    tryout: 'Tryout UTBK 2',
    score: 95
  }
];

export function RecentSales() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Aktivitas Tryout Terbaru</CardTitle>
        <CardDescription>Hasil tryout terbaru dari siswa</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {tryoutData.map((item) => (
            <div key={item.email} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={item.avatar} alt={item.name} />
                <AvatarFallback>{item.fallback}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>{item.name}</p>
                <p className='text-muted-foreground text-sm'>{item.tryout}</p>
              </div>
              <div className='ml-auto font-medium'>Nilai: {item.score}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
