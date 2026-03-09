'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import SignUpForm from './SignUp.client'; 

export default function Page() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState('');

  // Логика регистрации
  const handleRegister = async (formData: FormData) => {
    setError('');
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);

      if (res) {
        setUser(res);
        router.push('/profile');
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

  // Передаем логику в форму
  return <SignUpForm onSubmit={handleRegister} error={error} />;
}