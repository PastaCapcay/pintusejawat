import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className='flex h-full items-center justify-center p-4 lg:p-8'>
      <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
        <div className='w-full'>
          <Link
            href='/'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex items-center gap-2'
            )}
          >
            <ArrowLeft className='h-4 w-4' />
            Kembali ke Beranda
          </Link>
        </div>

        <ClerkSignInForm />

        <p className='text-muted-foreground px-8 text-center text-sm'>
          By clicking continue, you agree to our{' '}
          <Link
            href='/terms'
            className='hover:text-primary underline underline-offset-4'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='hover:text-primary underline underline-offset-4'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
