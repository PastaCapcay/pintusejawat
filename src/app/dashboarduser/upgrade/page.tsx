'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: '199',
    features: ['Akses 3 bulan', 'Tryout'],
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '349',
    features: ['Akses 3 bulan', 'Tryout', 'Latihan Soal', 'Modul'],
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'pro-plus',
    name: 'Pro Plus',
    price: '599',
    features: [
      'Akses sampai lulus',
      'Tryout',
      'Latihan Soal',
      'Modul',
      '24 jam tanya jawab dengan mentor'
    ],
    icon: MessageCircle,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  }
];

export default function UpgradePage() {
  const router = useRouter();

  const handlePackageSelect = (packageId: string) => {
    router.push(`/dashboarduser/upgrade/checkout/${packageId}`);
  };

  return (
    <PageContainer>
      <div className='container mx-auto p-8'>
        <h1 className='mb-8 text-3xl font-bold'>Upgrade Paket</h1>

        <div className='grid gap-6 md:grid-cols-3'>
          {packages.map((pkg) => (
            <Card key={pkg.id} className='relative overflow-hidden'>
              <div className={`absolute inset-x-0 top-0 h-2 ${pkg.bgColor}`} />
              <CardHeader>
                <div
                  className={`mb-4 inline-block rounded-full ${pkg.bgColor} p-3`}
                >
                  <pkg.icon className={`h-6 w-6 ${pkg.color}`} />
                </div>
                <CardTitle className='flex flex-col gap-2'>
                  <span className='text-xl'>{pkg.name}</span>
                  <span className='text-primary text-3xl font-bold'>
                    Rp {pkg.price}K
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2'>
                  {pkg.features.map((feature, i) => (
                    <li key={i} className='flex items-center gap-2'>
                      <CheckCircle2 className='h-4 w-4 text-green-500' />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className='mt-6 w-full'
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  Pilih Paket
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
