import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { JenisMateri } from './tambah-materi-dialog';
import { MateriColumn } from './columns';

const formSchema = z.object({
  nama: z.string().min(1, 'Nama materi wajib diisi'),
  deskripsi: z.string().optional(),
  jenis: z.enum([JenisMateri.VIDEO, JenisMateri.DOKUMEN]),
  link: z.string().min(1, 'Link materi wajib diisi')
});

type FormValues = z.infer<typeof formSchema>;

interface EditMateriDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  materi: MateriColumn;
}

export function EditMateriDialog({
  open,
  onOpenChange,
  onSuccess,
  materi
}: EditMateriDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: materi.nama,
      deskripsi: materi.deskripsi || '',
      jenis: materi.jenis,
      link: materi.link
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch(`/api/materi/${materi.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      toast.success('Materi berhasil diperbarui');
      if (onSuccess) {
        onSuccess();
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Materi</DialogTitle>
          <DialogDescription>
            Edit informasi materi pembelajaran di sini
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='nama'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Materi</FormLabel>
                  <FormControl>
                    <Input placeholder='Nama materi' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='deskripsi'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Deskripsi materi'
                      className='min-h-[100px]'
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='jenis'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Materi</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih jenis materi' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(JenisMateri).map((jenis) => (
                        <SelectItem key={jenis} value={jenis}>
                          {jenis}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='link'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Materi</FormLabel>
                  <FormControl>
                    <Input placeholder='https://...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Batal
              </Button>
              <Button type='submit'>Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
