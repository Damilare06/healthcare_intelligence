'use client'

import React from 'react';
import AskNova from '@/components/AskNova';
import PreCallPreparation from '@/components/PreCallPreparation';
import DuringCall from '@/components/DuringCall';
import PostCallAnalysis from '@/components/PostCallAnalysis';

export default function TalentScreeningPage() {
  const [activeTab, setActiveTab] = React.useState('ask-nova');
  const [candidatePhoneNumber, setCandidatePhoneNumber] = React.useState('+1 (555) 123-4567');

  const handleStartCall = (phoneNumber: string) => {
    setCandidatePhoneNumber(phoneNumber);
    setActiveTab('during-call');
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'ask-nova': return <AskNova />;
      case 'pre-call': return <PreCallPreparation onStartCall={handleStartCall} />;
      case 'during-call': return <DuringCall candidatePhoneNumber={candidatePhoneNumber} />;
      case 'post-call': return <PostCallAnalysis />;
      default: return <AskNova />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">Talent Screening</h1>
        <div className="w-full">
          <div className="flex mb-8 bg-indigo-100 rounded-xl p-1 overflow-x-auto">
            {['ask-nova', 'pre-call', 'during-call', 'post-call'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 p-3 rounded-lg transition-all duration-300 ease-in-out ${
                  activeTab === tab
                    ? 'bg-white text-indigo-600 shadow-md transform scale-105'
                    : 'text-indigo-600 hover:bg-indigo-200'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}