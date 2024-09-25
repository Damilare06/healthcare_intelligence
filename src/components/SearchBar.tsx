import React from 'react'
import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
    </div>
  )
}