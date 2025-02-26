'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Authentication Error</h1>
      <p className="text-gray-700 mb-4">
        {error || 'An error occurred during authentication'}
      </p>
      {errorDescription && (
        <p className="text-sm text-gray-500 mb-4">{errorDescription}</p>
      )}
      <Link 
        href="/auth/signin" 
        className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Again
      </Link>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
} 