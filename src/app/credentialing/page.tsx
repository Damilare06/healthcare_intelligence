'use client'

import React from 'react'
import CredentialTable from '@/components/CredentialTable'

export default function Credentialing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">Credentialing</h1>
        <CredentialTable />
      </div>
    </div>
  )
}