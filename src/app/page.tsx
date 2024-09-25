'use client'

import React, { useState } from 'react'
import { ClipboardList, Phone, FileText, BarChart, HelpCircle, Search } from 'lucide-react'
import AskNova from '@/components/AskNova'
import PreCallPreparation from '@/components/PreCallPreparation'
import DuringCall from '@/components/DuringCall'
import PostCallAnalysis from '@/components/PostCallAnalysis'
import FollowUpReporting from '@/components/FollowUpReporting'

export default function Home() {
  const [activeTab, setActiveTab] = useState('ask-nova')
  const [candidatePhoneNumber, setCandidatePhoneNumber] = useState('+1 (555) 123-4567')

  const handleStartCall = (phoneNumber: string) => {
    setCandidatePhoneNumber(phoneNumber)
    setActiveTab('during-call')
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'ask-nova': return <AskNova />
      case 'pre-call': return <PreCallPreparation onStartCall={handleStartCall} />
      case 'during-call': return <DuringCall candidatePhoneNumber={candidatePhoneNumber} />
      case 'post-call': return <PostCallAnalysis />
      case 'follow-up': return <FollowUpReporting />
      default: return <AskNova />
    }
  }

  const talentSearchTabs = [
    { id: 'ask-nova', label: 'Ask Nova', icon: HelpCircle },
    { id: 'pre-call', label: 'Pre-Call', icon: ClipboardList },
    { id: 'during-call', label: 'During Call', icon: Phone },
    { id: 'post-call', label: 'Post-Call', icon: FileText },
    { id: 'follow-up', label: 'Follow-up', icon: BarChart },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">Healthcare Recruitment Intelligence</h1>
        <div className="w-full">
          <div className="flex w-full mb-8 bg-indigo-100 rounded-xl p-1 overflow-x-auto">
            {talentSearchTabs.map((tab) => (
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
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  )
}