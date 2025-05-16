'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { JenisMateri } from './tambah-materi-dialog';

interface LihatMateriDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  materi: {
    nama: string;
    jenis: JenisMateri;
    link: string;
  };
}

export function LihatMateriDialog({
  open,
  onOpenChange,
  materi
}: LihatMateriDialogProps) {
  const isYoutubeVideo =
    materi.link.includes('youtube.com') || materi.link.includes('youtu.be');
  const youtubeSrc = isYoutubeVideo
    ? convertToEmbedUrl(materi.link)
    : materi.link;

  const renderContent = () => {
    if (materi.jenis === JenisMateri.VIDEO) {
      if (isYoutubeVideo) {
        return (
          <div className='flex h-[calc(90vh-73px)] w-full items-center justify-center bg-black/5 md:h-[calc(95vh-73px)]'>
            <div className='mx-auto w-full max-w-[1440px] p-4'>
              <div className='relative w-full pb-[56.25%]'>
                <iframe
                  src={youtubeSrc}
                  className='absolute left-0 top-0 h-full w-full rounded-lg'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                  referrerPolicy='strict-origin-when-cross-origin'
                />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className='flex h-[calc(90vh-73px)] w-full items-center justify-center bg-black/5 md:h-[calc(95vh-73px)]'>
            <div className='mx-auto w-full max-w-[1440px] p-4'>
              <div className='relative w-full pb-[56.25%]'>
                <video
                  src={materi.link}
                  controls
                  className='absolute left-0 top-0 h-full w-full rounded-lg'
                >
                  Browser Anda tidak mendukung pemutaran video.
                </video>
              </div>
            </div>
          </div>
        );
      }
    } else {
      // Untuk PDF, kita gunakan Google Docs Viewer untuk menampilkan PDF
      const pdfViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(materi.link)}&embedded=true`;
      return (
        <div className='h-[calc(90vh-73px)] w-full bg-black/5 md:h-[calc(95vh-73px)]'>
          <iframe
            src={pdfViewerUrl}
            className='h-full w-full'
            frameBorder='0'
          />
        </div>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='min-h-[90vh] w-full max-w-[95vw] gap-0 p-0 md:min-h-[95vh]'>
        <DialogHeader className='border-b px-6 py-4'>
          <DialogTitle className='text-xl font-semibold'>
            {materi.nama}
          </DialogTitle>
        </DialogHeader>
        <div className='flex-1 overflow-hidden bg-muted/5'>
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function convertToEmbedUrl(url: string): string {
  // Convert youtube.com URL to embed URL
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return url;
}
