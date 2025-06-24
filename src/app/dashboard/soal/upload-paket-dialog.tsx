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
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

interface UploadPaketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function UploadPaketDialog({
  open,
  onOpenChange,
  onSuccess
}: UploadPaketDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleDownloadTemplate = () => {
    const workbook = XLSX.utils.book_new();
    const data = [
      [
        'judul',
        'deskripsi',
        'pertanyaan',
        'opsiA',
        'opsiB',
        'opsiC',
        'opsiD',
        'opsiE',
        'jawabanBenar',
        'pembahasan'
      ],
      [
        'Contoh Paket Soal',
        'Deskripsi paket soal (opsional)',
        'Pertanyaan soal pertama?',
        'Opsi A',
        'Opsi B',
        'Opsi C',
        'Opsi D',
        'Opsi E',
        'A',
        'Pembahasan jawaban (opsional)'
      ],
      [
        '', // Judul dikosongkan karena menggunakan judul dari baris 2
        '', // Deskripsi dikosongkan karena menggunakan deskripsi dari baris 2
        'Pertanyaan soal kedua?',
        'Opsi A',
        'Opsi B',
        'Opsi C',
        'Opsi D',
        'Opsi E',
        'B',
        'Pembahasan jawaban (opsional)'
      ]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template Soal');
    XLSX.writeFile(workbook, 'template_paket_soal.xlsx');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.xlsx')) {
        setError('File harus berformat XLSX');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('File wajib diupload');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/paket-soal/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Gagal mengupload paket soal');
      }

      toast.success('Paket soal berhasil diupload');
      onSuccess();
      onOpenChange(false);
      setFile(null);
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
            <DialogTitle>Upload Paket Soal</DialogTitle>
            <DialogDescription>
              Upload paket soal menggunakan file XLSX. Format file:
              <br />- Baris 1: Header kolom
              <br />- Baris 2: Data soal pertama + judul dan deskripsi paket
              <br />- Baris 3+: Data soal-soal berikutnya (judul dan deskripsi
              dikosongkan)
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label>File XLSX</Label>
              <div className='flex items-center gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleDownloadTemplate}
                  className='flex items-center gap-2'
                >
                  <Download className='h-4 w-4' />
                  Download Template
                </Button>
              </div>
              <Input
                type='file'
                accept='.xlsx'
                onChange={handleFileChange}
                disabled={isLoading}
              />
              {error && (
                <Alert variant='destructive'>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
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
              {isLoading ? 'Mengupload...' : 'Upload'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
