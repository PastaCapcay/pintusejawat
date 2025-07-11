'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface UserAuthFormProps {
  onSignIn: (userId: string) => Promise<void>;
}

export function UserAuthForm({ onSignIn }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClientComponentClient();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password
        });

      if (authError) {
        toast.error(authError.message);
        return;
      }

      if (!authData.user) {
        throw new Error('Login gagal: tidak ada data user');
      }

      await onSignIn(authData.user.id);
      toast.success('Login berhasil!');
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(
        error instanceof Error ? error.message : 'Terjadi kesalahan saat login'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='grid gap-6'>
      <form onSubmit={onSubmit}>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              placeholder='********'
              type='password'
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? 'Sedang Login...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
}
