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
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface EditPaketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  paketSoal: {
    id: string;
    judul: string;
    deskripsi?: string | null;
  };
}

export function EditPaketDialog({
  open,
  onOpenChange,
  onSuccess,
  paketSoal
}: EditPaketDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    judul: paketSoal.judul,
    deskripsi: paketSoal.deskripsi || ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.judul.trim()) {
      setError('Judul wajib diisi');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/paket-soal/${paketSoal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Gagal mengupdate paket soal');
      }

      // Tutup dialog terlebih dahulu
      onOpenChange(false);

      // Tampilkan notifikasi dan tunggu sebentar
      toast.promise(
        new Promise((resolve) => {
          setTimeout(resolve, 1000);
        }),
        {
          loading: 'Menyimpan perubahan...',
          success: 'Paket soal berhasil diperbarui',
          error: 'Gagal memperbarui paket soal'
        }
      );

      // Tunggu sebentar sebelum refresh
      setTimeout(() => {
        onSuccess();
        router.refresh();
        window.location.reload();
      }, 1500);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Paket Soal</DialogTitle>
            <DialogDescription>
              Edit judul dan deskripsi paket soal.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='judul' className='flex items-center gap-1'>
                Judul
                <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='judul'
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                placeholder='Masukkan judul paket soal'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='deskripsi'>Deskripsi (Opsional)</Label>
              <Textarea
                id='deskripsi'
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                placeholder='Masukkan deskripsi paket soal'
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
