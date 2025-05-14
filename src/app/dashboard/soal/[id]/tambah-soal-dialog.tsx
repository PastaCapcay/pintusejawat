'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface TambahSoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  paketSoalId: string;
}

export function TambahSoalDialog({
  open,
  onOpenChange,
  onSuccess,
  paketSoalId
}: TambahSoalDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    pertanyaan: '',
    opsiA: '',
    opsiB: '',
    opsiC: '',
    opsiD: '',
    opsiE: '',
    jawabanBenar: '',
    pembahasan: ''
  });
  const [error, setError] = useState('');

  const [errors, setErrors] = useState({
    pertanyaan: '',
    opsiA: '',
    opsiB: '',
    opsiC: '',
    opsiD: '',
    opsiE: '',
    jawabanBenar: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      pertanyaan: '',
      opsiA: '',
      opsiB: '',
      opsiC: '',
      opsiD: '',
      opsiE: '',
      jawabanBenar: ''
    };

    if (!formData.pertanyaan.trim()) {
      newErrors.pertanyaan = 'Pertanyaan wajib diisi';
      isValid = false;
    }

    if (!formData.opsiA.trim()) {
      newErrors.opsiA = 'Opsi A wajib diisi';
      isValid = false;
    }

    if (!formData.opsiB.trim()) {
      newErrors.opsiB = 'Opsi B wajib diisi';
      isValid = false;
    }

    if (!formData.opsiC.trim()) {
      newErrors.opsiC = 'Opsi C wajib diisi';
      isValid = false;
    }

    if (!formData.opsiD.trim()) {
      newErrors.opsiD = 'Opsi D wajib diisi';
      isValid = false;
    }

    if (!formData.opsiE.trim()) {
      newErrors.opsiE = 'Opsi E wajib diisi';
      isValid = false;
    }

    if (!formData.jawabanBenar) {
      newErrors.jawabanBenar = 'Jawaban benar wajib dipilih';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/soal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          paketSoalId
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Gagal menambahkan soal');
      }

      // Tutup dialog dan tampilkan notifikasi sukses
      onOpenChange(false);
      toast.success('Soal berhasil ditambahkan');

      // Reset form
      setFormData({
        pertanyaan: '',
        opsiA: '',
        opsiB: '',
        opsiC: '',
        opsiD: '',
        opsiE: '',
        jawabanBenar: '',
        pembahasan: ''
      });
      setErrors({
        pertanyaan: '',
        opsiA: '',
        opsiB: '',
        opsiC: '',
        opsiD: '',
        opsiE: '',
        jawabanBenar: ''
      });

      // Refresh data tanpa reload halaman
      onSuccess();
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Terjadi kesalahan';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormData = () => {
    setFormData({
      pertanyaan: '',
      opsiA: '',
      opsiB: '',
      opsiC: '',
      opsiD: '',
      opsiE: '',
      jawabanBenar: '',
      pembahasan: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Soal</DialogTitle>
            <DialogDescription>
              Tambahkan soal baru ke dalam paket soal ini.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='pertanyaan' className='flex items-center gap-1'>
                Pertanyaan
                <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='pertanyaan'
                value={formData.pertanyaan}
                onChange={(e) => {
                  setFormData({ ...formData, pertanyaan: e.target.value });
                  if (errors.pertanyaan) {
                    setErrors({ ...errors, pertanyaan: '' });
                  }
                }}
                placeholder='Masukkan pertanyaan'
                className={errors.pertanyaan ? 'border-red-500' : ''}
              />
              {errors.pertanyaan && (
                <span className='text-sm text-red-500'>
                  {errors.pertanyaan}
                </span>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='opsiA' className='flex items-center gap-1'>
                Opsi A<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiA'
                value={formData.opsiA}
                onChange={(e) => {
                  setFormData({ ...formData, opsiA: e.target.value });
                  if (errors.opsiA) {
                    setErrors({ ...errors, opsiA: '' });
                  }
                }}
                placeholder='Masukkan opsi A'
                className={errors.opsiA ? 'border-red-500' : ''}
              />
              {errors.opsiA && (
                <span className='text-sm text-red-500'>{errors.opsiA}</span>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='opsiB' className='flex items-center gap-1'>
                Opsi B<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiB'
                value={formData.opsiB}
                onChange={(e) => {
                  setFormData({ ...formData, opsiB: e.target.value });
                  if (errors.opsiB) {
                    setErrors({ ...errors, opsiB: '' });
                  }
                }}
                placeholder='Masukkan opsi B'
                className={errors.opsiB ? 'border-red-500' : ''}
              />
              {errors.opsiB && (
                <span className='text-sm text-red-500'>{errors.opsiB}</span>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='opsiC' className='flex items-center gap-1'>
                Opsi C<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiC'
                value={formData.opsiC}
                onChange={(e) => {
                  setFormData({ ...formData, opsiC: e.target.value });
                  if (errors.opsiC) {
                    setErrors({ ...errors, opsiC: '' });
                  }
                }}
                placeholder='Masukkan opsi C'
                className={errors.opsiC ? 'border-red-500' : ''}
              />
              {errors.opsiC && (
                <span className='text-sm text-red-500'>{errors.opsiC}</span>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='opsiD' className='flex items-center gap-1'>
                Opsi D<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiD'
                value={formData.opsiD}
                onChange={(e) => {
                  setFormData({ ...formData, opsiD: e.target.value });
                  if (errors.opsiD) {
                    setErrors({ ...errors, opsiD: '' });
                  }
                }}
                placeholder='Masukkan opsi D'
                className={errors.opsiD ? 'border-red-500' : ''}
              />
              {errors.opsiD && (
                <span className='text-sm text-red-500'>{errors.opsiD}</span>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='opsiE' className='flex items-center gap-1'>
                Opsi E<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiE'
                value={formData.opsiE}
                onChange={(e) => {
                  setFormData({ ...formData, opsiE: e.target.value });
                  if (errors.opsiE) {
                    setErrors({ ...errors, opsiE: '' });
                  }
                }}
                placeholder='Masukkan opsi E'
                className={errors.opsiE ? 'border-red-500' : ''}
              />
              {errors.opsiE && (
                <span className='text-sm text-red-500'>{errors.opsiE}</span>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='jawabanBenar' className='flex items-center gap-1'>
                Jawaban Benar
                <span className='text-red-500'>*</span>
              </Label>
              <Select
                value={formData.jawabanBenar}
                onValueChange={(value) => {
                  setFormData({ ...formData, jawabanBenar: value });
                  if (errors.jawabanBenar) {
                    setErrors({ ...errors, jawabanBenar: '' });
                  }
                }}
              >
                <SelectTrigger
                  className={errors.jawabanBenar ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder='Pilih jawaban benar' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='A'>Opsi A</SelectItem>
                  <SelectItem value='B'>Opsi B</SelectItem>
                  <SelectItem value='C'>Opsi C</SelectItem>
                  <SelectItem value='D'>Opsi D</SelectItem>
                  <SelectItem value='E'>Opsi E</SelectItem>
                </SelectContent>
              </Select>
              {errors.jawabanBenar && (
                <span className='text-sm text-red-500'>
                  {errors.jawabanBenar}
                </span>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='pembahasan'>Pembahasan (Opsional)</Label>
              <Textarea
                id='pembahasan'
                value={formData.pembahasan}
                onChange={(e) =>
                  setFormData({ ...formData, pembahasan: e.target.value })
                }
                placeholder='Masukkan pembahasan jawaban'
              />
            </div>

            {error && (
              <Alert variant='destructive'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
