'use client'

import React from 'react';
import CredentialTimeline from '@/components/CredentialTimeline';

export default function CredentialTimelinePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">Credential Timeline for Candidate ID: {params.id}</h1>
        <CredentialTimeline />
      </div>
    </div>
  );
}