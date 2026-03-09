'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import SignInForm from './SignIn.client'; // визуальная форма

export default function Page() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState('');

  // Логика авторизации
  const handleLogin = async (formData: FormData) => {
    setError('');
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);

      if (res) {
        setUser(res);
        router.push('/profile'); // редирект после успешного входа
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      const apiErr = err as ApiError;
      setError(
        apiErr.response?.data?.error ||
        apiErr.message ||
        'Oops... some error'
      );
    }
  };

  return <SignInForm onSubmit={handleLogin} error={error} />;
}