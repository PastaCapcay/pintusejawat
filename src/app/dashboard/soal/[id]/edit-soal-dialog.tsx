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
import { useState, useEffect } from 'react';
import { Soal } from './columns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TextWithImage } from '@/components/ui/text-with-image';

interface EditSoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  soal: Soal;
}

export function EditSoalDialog({
  open,
  onOpenChange,
  onSuccess,
  soal
}: EditSoalDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk mengekstrak teks dan URL gambar
  const extractTextAndImage = (content: string) => {
    const matches = content.match(/\((.*?)\)/);
    if (!matches) return { text: content, imageUrl: '' };
    const text = content.replace(/\(.*?\)/, '').trim();
    const imageUrl = matches[1];
    return { text, imageUrl };
  };

  const [formData, setFormData] = useState({
    pertanyaan: extractTextAndImage(soal.pertanyaan).text,
    gambarPertanyaan: extractTextAndImage(soal.pertanyaan).imageUrl,
    opsiA: extractTextAndImage(soal.opsiA).text,
    gambarOpsiA: extractTextAndImage(soal.opsiA).imageUrl,
    opsiB: extractTextAndImage(soal.opsiB).text,
    gambarOpsiB: extractTextAndImage(soal.opsiB).imageUrl,
    opsiC: extractTextAndImage(soal.opsiC).text,
    gambarOpsiC: extractTextAndImage(soal.opsiC).imageUrl,
    opsiD: extractTextAndImage(soal.opsiD).text,
    gambarOpsiD: extractTextAndImage(soal.opsiD).imageUrl,
    opsiE: extractTextAndImage(soal.opsiE).text,
    gambarOpsiE: extractTextAndImage(soal.opsiE).imageUrl,
    jawabanBenar: soal.jawabanBenar,
    pembahasan: extractTextAndImage(soal.pembahasan || '').text,
    gambarPembahasan: extractTextAndImage(soal.pembahasan || '').imageUrl
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

  useEffect(() => {
    if (soal) {
      setFormData({
        pertanyaan: extractTextAndImage(soal.pertanyaan).text,
        gambarPertanyaan: extractTextAndImage(soal.pertanyaan).imageUrl,
        opsiA: extractTextAndImage(soal.opsiA).text,
        gambarOpsiA: extractTextAndImage(soal.opsiA).imageUrl,
        opsiB: extractTextAndImage(soal.opsiB).text,
        gambarOpsiB: extractTextAndImage(soal.opsiB).imageUrl,
        opsiC: extractTextAndImage(soal.opsiC).text,
        gambarOpsiC: extractTextAndImage(soal.opsiC).imageUrl,
        opsiD: extractTextAndImage(soal.opsiD).text,
        gambarOpsiD: extractTextAndImage(soal.opsiD).imageUrl,
        opsiE: extractTextAndImage(soal.opsiE).text,
        gambarOpsiE: extractTextAndImage(soal.opsiE).imageUrl,
        jawabanBenar: soal.jawabanBenar,
        pembahasan: extractTextAndImage(soal.pembahasan || '').text,
        gambarPembahasan: extractTextAndImage(soal.pembahasan || '').imageUrl
      });
    }
  }, [soal]);

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

    // Format teks dengan gambar
    const formatTextWithImage = (text: string, imageUrl: string) => {
      if (!imageUrl) return text;
      return `${text} (${imageUrl})`;
    };

    try {
      const formattedData = {
        pertanyaan: formatTextWithImage(
          formData.pertanyaan,
          formData.gambarPertanyaan
        ),
        opsiA: formatTextWithImage(formData.opsiA, formData.gambarOpsiA),
        opsiB: formatTextWithImage(formData.opsiB, formData.gambarOpsiB),
        opsiC: formatTextWithImage(formData.opsiC, formData.gambarOpsiC),
        opsiD: formatTextWithImage(formData.opsiD, formData.gambarOpsiD),
        opsiE: formatTextWithImage(formData.opsiE, formData.gambarOpsiE),
        jawabanBenar: formData.jawabanBenar,
        pembahasan: formatTextWithImage(
          formData.pembahasan,
          formData.gambarPembahasan
        )
      };

      const response = await fetch(`/api/soal/${soal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui soal');
      }

      onOpenChange(false);
      toast.success('Soal berhasil diperbarui');
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
      pertanyaan: extractTextAndImage(soal.pertanyaan).text,
      gambarPertanyaan: extractTextAndImage(soal.pertanyaan).imageUrl,
      opsiA: extractTextAndImage(soal.opsiA).text,
      gambarOpsiA: extractTextAndImage(soal.opsiA).imageUrl,
      opsiB: extractTextAndImage(soal.opsiB).text,
      gambarOpsiB: extractTextAndImage(soal.opsiB).imageUrl,
      opsiC: extractTextAndImage(soal.opsiC).text,
      gambarOpsiC: extractTextAndImage(soal.opsiC).imageUrl,
      opsiD: extractTextAndImage(soal.opsiD).text,
      gambarOpsiD: extractTextAndImage(soal.opsiD).imageUrl,
      opsiE: extractTextAndImage(soal.opsiE).text,
      gambarOpsiE: extractTextAndImage(soal.opsiE).imageUrl,
      jawabanBenar: soal.jawabanBenar,
      pembahasan: extractTextAndImage(soal.pembahasan || '').text,
      gambarPembahasan: extractTextAndImage(soal.pembahasan || '').imageUrl
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Soal</DialogTitle>
            <DialogDescription className='space-y-2'>
              <p>Edit soal yang sudah ada.</p>
              <div className='mt-2 text-sm'>
                <p className='font-semibold'>Panduan Penggunaan Gambar:</p>
                <ul className='list-disc space-y-1 pl-4'>
                  <li>
                    Untuk menambahkan gambar, masukkan URL gambar di field yang
                    tersedia
                  </li>
                  <li>
                    Mendukung link Google Drive dengan format:
                    <ul className='list-disc pl-4'>
                      <li>https://drive.google.com/file/d/[FILE_ID]/view</li>
                      <li>https://drive.google.com/open?id=[FILE_ID]</li>
                    </ul>
                  </li>
                  <li>
                    Untuk upload Excel, gunakan format: teks(link_gambar) tanpa
                    spasi
                  </li>
                  <li>
                    Contoh di Excel: Berapakah
                    2+2?(https://drive.google.com/file/d/xxx/view)
                  </li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='pertanyaan'>
                Pertanyaan<span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='pertanyaan'
                value={formData.pertanyaan}
                onChange={(e) =>
                  setFormData({ ...formData, pertanyaan: e.target.value })
                }
                placeholder='Masukkan pertanyaan'
              />
              <Input
                id='gambarPertanyaan'
                value={formData.gambarPertanyaan}
                onChange={(e) =>
                  setFormData({ ...formData, gambarPertanyaan: e.target.value })
                }
                placeholder='URL gambar pertanyaan (opsional)'
              />
              {formData.gambarPertanyaan && (
                <TextWithImage
                  content={`${formData.pertanyaan} (${formData.gambarPertanyaan})`}
                />
              )}
            </div>

            {/* Opsi A */}
            <div className='grid gap-2'>
              <Label htmlFor='opsiA'>
                Opsi A<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiA'
                value={formData.opsiA}
                onChange={(e) =>
                  setFormData({ ...formData, opsiA: e.target.value })
                }
                placeholder='Masukkan opsi A'
              />
              <Input
                id='gambarOpsiA'
                value={formData.gambarOpsiA}
                onChange={(e) =>
                  setFormData({ ...formData, gambarOpsiA: e.target.value })
                }
                placeholder='URL gambar opsi A (opsional)'
              />
              {formData.gambarOpsiA && (
                <TextWithImage
                  content={`${formData.opsiA} (${formData.gambarOpsiA})`}
                  isOption={true}
                />
              )}
            </div>

            {/* Opsi B */}
            <div className='grid gap-2'>
              <Label htmlFor='opsiB'>
                Opsi B<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiB'
                value={formData.opsiB}
                onChange={(e) =>
                  setFormData({ ...formData, opsiB: e.target.value })
                }
                placeholder='Masukkan opsi B'
              />
              <Input
                id='gambarOpsiB'
                value={formData.gambarOpsiB}
                onChange={(e) =>
                  setFormData({ ...formData, gambarOpsiB: e.target.value })
                }
                placeholder='URL gambar opsi B (opsional)'
              />
              {formData.gambarOpsiB && (
                <TextWithImage
                  content={`${formData.opsiB} (${formData.gambarOpsiB})`}
                  isOption={true}
                />
              )}
            </div>

            {/* Opsi C */}
            <div className='grid gap-2'>
              <Label htmlFor='opsiC'>
                Opsi C<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiC'
                value={formData.opsiC}
                onChange={(e) =>
                  setFormData({ ...formData, opsiC: e.target.value })
                }
                placeholder='Masukkan opsi C'
              />
              <Input
                id='gambarOpsiC'
                value={formData.gambarOpsiC}
                onChange={(e) =>
                  setFormData({ ...formData, gambarOpsiC: e.target.value })
                }
                placeholder='URL gambar opsi C (opsional)'
              />
              {formData.gambarOpsiC && (
                <TextWithImage
                  content={`${formData.opsiC} (${formData.gambarOpsiC})`}
                  isOption={true}
                />
              )}
            </div>

            {/* Opsi D */}
            <div className='grid gap-2'>
              <Label htmlFor='opsiD'>
                Opsi D<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiD'
                value={formData.opsiD}
                onChange={(e) =>
                  setFormData({ ...formData, opsiD: e.target.value })
                }
                placeholder='Masukkan opsi D'
              />
              <Input
                id='gambarOpsiD'
                value={formData.gambarOpsiD}
                onChange={(e) =>
                  setFormData({ ...formData, gambarOpsiD: e.target.value })
                }
                placeholder='URL gambar opsi D (opsional)'
              />
              {formData.gambarOpsiD && (
                <TextWithImage
                  content={`${formData.opsiD} (${formData.gambarOpsiD})`}
                  isOption={true}
                />
              )}
            </div>

            {/* Opsi E */}
            <div className='grid gap-2'>
              <Label htmlFor='opsiE'>
                Opsi E<span className='text-red-500'>*</span>
              </Label>
              <Input
                id='opsiE'
                value={formData.opsiE}
                onChange={(e) =>
                  setFormData({ ...formData, opsiE: e.target.value })
                }
                placeholder='Masukkan opsi E'
              />
              <Input
                id='gambarOpsiE'
                value={formData.gambarOpsiE}
                onChange={(e) =>
                  setFormData({ ...formData, gambarOpsiE: e.target.value })
                }
                placeholder='URL gambar opsi E (opsional)'
              />
              {formData.gambarOpsiE && (
                <TextWithImage
                  content={`${formData.opsiE} (${formData.gambarOpsiE})`}
                  isOption={true}
                />
              )}
            </div>

            {/* Jawaban Benar */}
            <div className='grid gap-2'>
              <Label htmlFor='jawabanBenar'>
                Jawaban Benar<span className='text-red-500'>*</span>
              </Label>
              <Select
                value={formData.jawabanBenar}
                onValueChange={(value) =>
                  setFormData({ ...formData, jawabanBenar: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Pilih jawaban benar' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='A'>A</SelectItem>
                  <SelectItem value='B'>B</SelectItem>
                  <SelectItem value='C'>C</SelectItem>
                  <SelectItem value='D'>D</SelectItem>
                  <SelectItem value='E'>E</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pembahasan */}
            <div className='grid gap-2'>
              <Label htmlFor='pembahasan'>Pembahasan (Opsional)</Label>
              <Textarea
                id='pembahasan'
                value={formData.pembahasan}
                onChange={(e) =>
                  setFormData({ ...formData, pembahasan: e.target.value })
                }
                placeholder='Masukkan pembahasan'
              />
              <Input
                id='gambarPembahasan'
                value={formData.gambarPembahasan}
                onChange={(e) =>
                  setFormData({ ...formData, gambarPembahasan: e.target.value })
                }
                placeholder='URL gambar pembahasan (opsional)'
              />
              {formData.gambarPembahasan && (
                <TextWithImage
                  content={`${formData.pembahasan} (${formData.gambarPembahasan})`}
                />
              )}
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
