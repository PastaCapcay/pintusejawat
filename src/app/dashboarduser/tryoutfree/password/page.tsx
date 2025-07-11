'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'iqsejawat') {
      // Ganti dengan password yang diinginkan
      document.cookie = 'tryout_access=true; path=/dashboarduser/tryoutfree';
      router.push('/dashboarduser/tryoutfree');
    } else {
      setError('Password salah');
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <h1 className='text-2xl font-bold'>Akses Tryout Gratis</h1>
        <p>Masukkan password untuk melanjutkan</p>
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        {error && <p className='text-red-500'>{error}</p>}
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
}
