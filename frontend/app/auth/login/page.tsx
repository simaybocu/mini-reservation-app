'use client';
import { useState } from 'react';
import { apiPost } from '../../../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { token, user } = await apiPost('/auth/login', { email, password });
      localStorage.setItem('token', token);
      if (user?.email) localStorage.setItem('userEmail', user.email);
      location.href = '/';
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message || 'Login failed');
      } else {
        alert('Login failed');
      }
    }
  };
  return (
    <form
      onSubmit={submit}
      className="max-w-sm mx-auto mt-16 p-8 bg-white rounded shadow flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </form>
  );
}
