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

  // Fungsi untuk mengecek apakah ada link gambar
  const hasImageLink = (text: string) => {
    return text.includes('(') && text.includes(')');
  };

  // Fungsi untuk mendapatkan URL gambar
  const getImageUrl = (text: string) => {
    const matches = text.match(/\((.*?)\)/g);
    if (!matches) return null;
    return matches
      .map((match) => {
        const url = match.slice(1, -1); // Hapus kurung

        // Jika URL sudah gagal dimuat sebelumnya, return null
        if (failedImages.has(url)) {
          return null;
        }

        // Konversi Google Drive link jika ada
        const convertedUrl = convertGDriveLink(url);

        // Validasi URL
        try {
          // Coba parse URL untuk validasi
          if (
            convertedUrl.startsWith('http://') ||
            convertedUrl.startsWith('https://')
          ) {
            return convertedUrl;
          }
          // Untuk URL relatif, pastikan dimulai dengan /
          return convertedUrl.startsWith('/')
            ? convertedUrl
            : `/${convertedUrl}`;
        } catch {
          return null;
        }
      })
      .filter(Boolean); // Filter out null values
  };

  // Fungsi untuk membersihkan teks dari tag gambar
  const cleanText = (text: string) => {
    return text.replace(/\(.*?\)/g, '').trim();
  };

  if (!content || !hasImageLink(content)) {
    return <div className={className}>{content}</div>;
  }

  const imageUrls = getImageUrl(content);
  const cleanedText = cleanText(content);

  if (!imageUrls || imageUrls.length === 0) {
    return <div className={className}>{content}</div>;
  }

  return (
    <div
      className={`${isOption ? 'flex items-center gap-4' : 'space-y-2'} ${className}`}
    >
      {cleanedText && <div>{cleanedText}</div>}
      {imageUrls.map(
        (url, index) =>
          url && (
            <div
              key={index}
              className={`relative ${isOption ? 'h-16 w-16' : 'h-64 w-full'} overflow-hidden rounded-lg`}
            >
              <Image
                src={url}
                alt={`Gambar ${index + 1}`}
                fill
                className='object-contain'
                onError={(e) => {
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.style.display = 'none';
                  setFailedImages((prev) => new Set(prev).add(url));
                }}
              />
            </div>
          )
      )}
    </div>
  );
}
