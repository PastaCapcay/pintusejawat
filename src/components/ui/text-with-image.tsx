'use client';

import Image from 'next/image';
import { useState } from 'react';
import { convertGDriveLink } from '@/lib/utils';

interface TextWithImageProps {
  content: string | null;
  className?: string;
  isOption?: boolean;
}

export function TextWithImage({
  content = '',
  className = '',
  isOption = false
}: TextWithImageProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  if (!content) {
    return null;
  }

  // Fungsi untuk mengekstrak teks dan URL gambar
  const extractTextAndImage = (text: string) => {
    const matches = text.match(/\((https?:\/\/.*?)\)/);
    if (!matches) return { text, imageUrl: null };
    const cleanedText = text.replace(/\((https?:\/\/.*?)\)/, '').trim();
    const imageUrl = matches[1];
    return { text: cleanedText, imageUrl };
  };

  const { text, imageUrl } = extractTextAndImage(content);

  // Jika URL gambar gagal dimuat sebelumnya, tampilkan teks saja
  if (imageUrl && failedImages.has(imageUrl)) {
    return (
      <div className={`text-base leading-relaxed ${className}`}>{text}</div>
    );
  }

  // Jika tidak ada gambar, tampilkan teks saja
  if (!imageUrl) {
    return (
      <div className={`text-base leading-relaxed ${className}`}>{text}</div>
    );
  }

  // Konversi URL Google Drive jika ada
  const convertedUrl = convertGDriveLink(imageUrl);

  return (
    <div
      className={`${
        isOption ? 'flex items-center gap-4' : 'flex flex-col gap-4'
      } ${className}`}
    >
      {text && <div className='text-base leading-relaxed'>{text}</div>}
      <div
        className={`relative ${
          isOption ? 'h-16 w-16 flex-shrink-0' : 'h-64 w-full'
        } overflow-hidden rounded-lg bg-gray-100`}
      >
        <Image
          src={convertedUrl}
          alt='Gambar soal'
          fill
          className='object-contain'
          onError={(e) => {
            const imgElement = e.target as HTMLImageElement;
            imgElement.style.display = 'none';
            setFailedImages((prev) => new Set(prev).add(imageUrl));
          }}
        />
      </div>
    </div>
  );
}
