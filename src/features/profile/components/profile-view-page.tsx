'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email.'
  })
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileViewPage() {
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  });

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        form.reset({
          name: user.user_metadata?.name || '',
          email: user.email || ''
        });
      }
      setIsLoading(false);
    };

    getProfile();
  }, [form, supabase.auth]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      const { error } = await supabase.auth.updateUser({
        email: data.email,
        data: { name: data.name }
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <div className='flex w-full flex-col p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your name'
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your email'
                        type='email'
                        {...field}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={isLoading}>
                Update profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
