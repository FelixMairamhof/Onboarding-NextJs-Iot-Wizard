import React from 'react';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral items-center justify-center p-24">
      <h1 className="text-2xl font-bold text-neutral-content">Login</h1>
      <LoginForm />
    </main>
  );
}
