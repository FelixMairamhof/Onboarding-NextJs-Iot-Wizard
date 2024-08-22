import React from 'react';
import LoginForm from '@/components/LoginForm';
import BackButton from '@/components/BackButton';

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral items-center justify-center p-24">
      <div className='absolute top-20 left-6'>
        <BackButton path='/'/>
      </div>
      <h1 className="text-2xl font-bold text-neutral-content">Login</h1>
      <LoginForm />
    </main>
  );
}
