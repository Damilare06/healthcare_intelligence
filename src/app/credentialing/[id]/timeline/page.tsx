'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CredentialTimeline from '@/components/CredentialTimeline';

// You might want to move this to a shared utility file
const fetchCandidateData = async (id: string) => {
  // In a real application, this would be an API call
  const mockData = [
    { id: '1', name: 'Dr. Amy Collins', specialty: 'Cardiothoracic Surgery' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Cardiologist' },
    { id: '3', name: 'Dr. Sarah Johnson', specialty: 'Neurologist' },
    // ... add more mock data as needed
  ];

  const candidate = mockData.find(c => c.id === id);
  return candidate || { id, name: `Candidate ${id}`, specialty: 'Unknown' };
};

export default function CandidateTimelinePage() {
  const params = useParams();
  const { id } = params;
  const [candidate, setCandidate] = useState<any | null>(null);

  useEffect(() => {
    const loadCandidate = async () => {
      if (typeof id === 'string') {
        const data = await fetchCandidateData(id);
        setCandidate(data);
      }
    };

    loadCandidate();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">
          Full Timeline: {candidate ? candidate.name : 'Loading...'}
        </h1>
        {candidate && <CredentialTimeline candidate={candidate} />}
      </div>
    </div>
  );
}