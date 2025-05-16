'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useToast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import PageContainer from '@/components/layout/page-container';
import { Loader2 } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const packages = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 199000,
    duration: '3 bulan'
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 349000,
    duration: '3 bulan'
  },
  'pro-plus': {
    id: 'pro-plus',
    name: 'Pro Plus',
    price: 599000,
    duration: 'Sampai Lulus'
  }
};

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    whatsapp: '',
    paymentProof: null as File | null
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: currentUser }
      } = await supabase.auth.getUser();
      if (currentUser) {
        setUser(currentUser);
        setFormData((prev) => ({
          ...prev,
          email: currentUser.email || ''
        }));
      }
    };

    getUser();
  }, [supabase.auth]);

  useEffect(() => {
    if (
      params.packageId &&
      packages[params.packageId as keyof typeof packages]
    ) {
      setSelectedPackage(packages[params.packageId as keyof typeof packages]);
    } else {
      router.push('/dashboarduser/upgrade');
    }
  }, [params.packageId, router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'File harus berupa gambar (JPG, PNG, atau GIF)'
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Ukuran file maksimal 5MB'
        });
        return;
      }
      setFormData((prev) => ({ ...prev, paymentProof: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.whatsapp || !formData.paymentProof) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Mohon lengkapi semua field yang wajib diisi'
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('whatsapp', formData.whatsapp);
      formDataToSend.append('packageId', selectedPackage.id);
      formDataToSend.append('paymentProof', formData.paymentProof);

      const response = await fetch('/api/upgrade/payment', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Gagal mengirim bukti pembayaran');
      }

      // Buka WhatsApp di tab baru
      window.open(result.data.waUrl, '_blank');
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Terjadi kesalahan saat mengirim bukti pembayaran'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedPackage) {
    return null;
  }

  return (
    <PageContainer>
      <div className='mx-auto max-w-2xl space-y-8'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Checkout</h2>
          <p className='text-muted-foreground'>
            Lengkapi form pembayaran di bawah ini
          </p>
        </div>

        <div className='grid gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Detail Paket</CardTitle>
              <CardDescription>Informasi paket yang Anda pilih</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-between'>
                <span className='font-medium'>{selectedPackage.name}</span>
                <span className='font-bold text-primary'>
                  {formatPrice(selectedPackage.price)}
                </span>
              </div>
              <div className='text-sm text-muted-foreground'>
                Masa Aktif: {selectedPackage.duration}
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Form Pembayaran</CardTitle>
                <CardDescription>
                  Silakan transfer ke rekening berikut dan upload bukti
                  pembayaran
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value
                      }))
                    }
                    disabled
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='whatsapp'>
                    Nomor WhatsApp <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='whatsapp'
                    type='tel'
                    placeholder='Contoh: 08123456789'
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        whatsapp: e.target.value
                      }))
                    }
                    required
                  />
                </div>

                <Collapsible>
                  <div className='flex items-center justify-between'>
                    <Label>Panduan Pembayaran</Label>
                    <CollapsibleTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <ChevronDown className='h-4 w-4' />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className='space-y-2'>
                    <div className='rounded-lg border p-4'>
                      <p className='font-medium'>
                        Transfer ke rekening berikut:
                      </p>
                      <div className='mt-2 space-y-1'>
                        <p>345365324</p>
                        <p>BNI</p>
                        <p>SYIHABUDDIN ZUHAIR</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className='space-y-2'>
                  <Label htmlFor='paymentProof'>
                    Upload Bukti Transfer{' '}
                    <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='paymentProof'
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    required
                  />
                  <p className='text-sm text-muted-foreground'>
                    Format: JPG, PNG, atau GIF. Maksimal 5MB
                  </p>
                </div>

                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  {isLoading ? 'Mengirim...' : 'Kirim Bukti Pembayaran'}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
