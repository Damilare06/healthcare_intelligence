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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">Healthcare Recruitment Intelligence</h1>
        <div className="w-full">
          {/* ... (rest of your JSX) */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  )
}