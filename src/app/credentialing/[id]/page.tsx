'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PSV, BackgroundCheck, CommitteeReview, PeerReferences, HospitalPrivileges, FinalApproval } from '@/components/CredentialingComponents';
import { FileCheck, Shield, Users, Building, CheckSquare } from 'lucide-react';
import CredentialSummaryTimeline from '@/components/CredentialSummaryTimeline';

// Mock function to simulate fetching candidate data
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

const generateMockTimelineEvents = (candidateId: string | undefined): TimelineEvent[] => {
  if (!candidateId) return [];
  
  // This function should be the same as the one in CredentialTable
  return [
    { id: `${candidateId}-1`, date: '2020-01-15', type: 'license', status: 'active', details: 'NY Medical License Issued' },
    { id: `${candidateId}-2`, date: '2020-03-20', type: 'certification', status: 'active', details: 'Board Certification in Cardiothoracic Surgery' },
    { id: `${candidateId}-3`, date: '2021-05-10', type: 'cme', status: 'completed', details: 'Completed 50 CME credits' },
    { id: `${candidateId}-4`, date: '2022-02-01', type: 'license', status: 'active', details: 'CA Medical License Issued' },
    { id: `${candidateId}-5`, date: '2022-11-30', type: 'disciplinary', status: 'issue', details: 'Minor disciplinary action - resolved' },
    { id: `${candidateId}-6`, date: '2023-01-15', type: 'license', status: 'pending', details: 'TX Medical License Application Submitted' },
    { id: `${candidateId}-7`, date: '2023-06-30', type: 'certification', status: 'expired', details: 'BLS Certification Expired' },
  ];
};

export default function SpecificCandidatePage() {
  const params = useParams();
  const { id } = params;
  const [candidate, setCandidate] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('psv');

  useEffect(() => {
    const loadCandidate = async () => {
      if (typeof id === 'string') {
        const data = await fetchCandidateData(id);
        setCandidate(data);
      }
    };

    loadCandidate();
  }, [id]);

  const tabs = [
    { id: 'psv', label: 'PSV', icon: FileCheck, component: PSV },
    { id: 'background', label: 'Background', icon: Shield, component: BackgroundCheck },
    { id: 'committee', label: 'Committee', icon: Users, component: CommitteeReview },
    { id: 'references', label: 'References', icon: Users, component: PeerReferences },
    { id: 'privileges', label: 'Privileges', icon: Building, component: HospitalPrivileges },
    { id: 'contract', label: 'Contract', icon: CheckSquare, component: FinalApproval },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || PSV;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">
          Candidate Details: {candidate ? candidate.name : 'Loading...'}
        </h1>
        
        {/* Specific Candidate Toolbar */}
        <div className="flex w-full mb-8 bg-indigo-100 rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 flex items-center justify-center p-3 rounded-lg transition-all duration-300 ease-in-out ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-md transform scale-105'
                  : 'text-indigo-600 hover:bg-indigo-200'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className={`w-5 h-5 mr-2 ${activeTab === tab.id ? 'text-indigo-600' : 'text-indigo-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Component */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          {activeTab === 'psv' ? (
            <>
              <CredentialSummaryTimeline 
                candidate={candidate}
                fullTimelineEvents={generateMockTimelineEvents(candidate?.id)}
                showFullHistoryButton={false}
              />
              <PSV candidate={candidate} />
            </>
          ) : (
            <ActiveComponent candidate={candidate} />
          )}
        </div>
      </div>
    </div>
  );
}