'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import CredentialTimeline from '@/components/CredentialTimeline';

// This is a mock function to get candidate name. In a real app, you'd fetch this from your data source.
const getCandidateName = (id: string) => {
  const candidates = {
    '1': 'Dr. Amy Collins',
    '2': 'Dr. Michael Chen',
    // ... add more candidates as needed
  };
  return candidates[id as keyof typeof candidates] || 'Unknown Candidate';
};

export default function CredentialTimelinePage() {
  const params = useParams();
  const { id } = params;
  const candidateName = getCandidateName(id as string);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">Credential Timeline for {candidateName}</h1>
        <CredentialTimeline candidateName={candidateName} />
      </div>
    </div>
  );
}