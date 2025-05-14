'use client';

import Image from 'next/image';

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
  // Fungsi untuk mengecek apakah ada link gambar
  const hasImageLink = (text: string) => {
    return text.includes('(');
  };

  // Fungsi untuk mendapatkan URL gambar
  const getImageUrl = (text: string) => {
    const matches = text.match(/\((.*?)\)/g);
    if (!matches) return null;
    return matches.map((match) => match.slice(1, -1)); // Hapus kurung
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

  return (
    <div
      className={`${isOption ? 'flex items-center gap-4' : 'space-y-2'} ${className}`}
    >
      {cleanedText && <div>{cleanedText}</div>}
      {imageUrls &&
        imageUrls.map((url, index) => (
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
              }}
            />
          </div>
        ))}
    </div>
  );
}
