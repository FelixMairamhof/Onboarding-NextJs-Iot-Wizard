import Link from 'next/link';
import React from 'react';
import { cookies } from 'next/headers';

export default function Home() {
  // Get the cookies on the server side
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;

  return (
    <main className="flex min-h-screen flex-col items-center bg-neutral justify-between p-24">
      <h1 className='text-neutral-content'>Welcome to IoT-Wizard</h1>
      {token ? (
        <h2 className='text-wrap w-20 overflow-x-hidden text-neutral-content'>Token: {token}</h2>
      ) : (
        <h2 className='text-neutral-content'>No token found. Please login.</h2>
      )}
      <Link href="/login">
        <button className="btn btn-outline">Login</button>
      </Link>
    </main>
  );
}
