import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp, Clock } from 'lucide-react'

interface FAQQuestion {
  question: string;
  answer: string;
  sources: number;
  extendedAnswer: string;
  fullAnswer: string;
}

interface ChatHistoryItem {
  query: string;
  answer: string;
  thread?: string;
}

export default function AskNova() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [expandedSearchIndex, setExpandedSearchIndex] = useState<number | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    { query: "What's the average surgery time for CABG?", answer: "The average surgery time for CABG at our hospital is 4 hours and 15 minutes.", thread: "This is based on data from the last 100 CABG procedures performed at our hospital. The shortest procedure took 3 hours and 30 minutes, while the longest took 6 hours due to complications." },
    { query: "How many cardiothoracic surgeons are on staff?", answer: "We currently have 12 full-time cardiothoracic surgeons on staff.", thread: "This includes 8 senior surgeons and 4 junior surgeons. We also have 3 part-time consulting surgeons who specialize in pediatric cardiothoracic surgery." },
  ])

  const faqQuestions: FAQQuestion[] = [
    { 
      question: "What is the typical patient load during weekend calls for the Cardiothoracic Surgery department?", 
      answer: "Based on our hospital data from the last quarter, the average patient load during weekend calls for the Cardiothoracic Surgery department is 8-12 patients.",
      extendedAnswer: "This includes both post-operative care and emergency admissions. The breakdown typically consists of 60% post-operative care patients and 40% emergency admissions.",
      sources: 3,
      fullAnswer: "Based on our hospital data from the last quarter, the average patient load during weekend calls for the Cardiothoracic Surgery department is 8-12 patients. This includes both post-operative care and emergency admissions. The breakdown typically consists of 60% post-operative care patients and 40% emergency admissions. Our data also shows that the busiest times are usually between 8 PM and 2 AM, with an average of 2-3 new admissions during this period."
    },
    { 
      question: "How many complex valve repair procedures were performed in the last month?", 
      answer: "According to our surgical records, 17 complex valve repair procedures were performed in the Cardiothoracic Surgery department last month.",
      extendedAnswer: "This is a 15% increase from the previous month. Of these, 10 were mitral valve repairs, 5 were aortic valve repairs, and 2 were tricuspid valve repairs.",
      sources: 2,
      fullAnswer: "According to our surgical records, 17 complex valve repair procedures were performed in the Cardiothoracic Surgery department last month. This is a 15% increase from the previous month. Of these, 10 were mitral valve repairs, 5 were aortic valve repairs, and 2 were tricuspid valve repairs. The increase is partly attributed to the introduction of a new minimally invasive technique that has allowed us to treat more complex cases."
    },
    { 
      question: "What is the current nurse-to-patient ratio in the Cardiothoracic ICU?", 
      answer: "The current nurse-to-patient ratio in our Cardiothoracic ICU is 1:2 during day shifts and 1:3 during night shifts.",
      extendedAnswer: "This is in line with our hospital's commitment to maintaining high-quality patient care. We also have a float nurse available during peak hours to assist with complex cases or sudden increases in patient acuity.",
      sources: 4,
      fullAnswer: "The current nurse-to-patient ratio in our Cardiothoracic ICU is 1:2 during day shifts and 1:3 during night shifts. This is in line with our hospital's commitment to maintaining high-quality patient care. We also have a float nurse available during peak hours to assist with complex cases or sudden increases in patient acuity. Our staffing model is reviewed quarterly to ensure it meets both patient care needs and staff well-being standards."
    },
    { 
      question: "How many minimally invasive cardiac surgeries were performed last quarter compared to traditional open-heart surgeries?", 
      answer: "In the last quarter, our Cardiothoracic Surgery department performed 62 minimally invasive cardiac surgeries compared to 89 traditional open-heart surgeries.",
      extendedAnswer: "This represents a 41% rate for minimally invasive procedures, up from 35% in the previous quarter.",
      sources: 2,
      fullAnswer: "In the last quarter, our Cardiothoracic Surgery department performed 62 minimally invasive cardiac surgeries compared to 89 traditional open-heart surgeries. This represents a 41% rate for minimally invasive procedures, up from 35% in the previous quarter. The increase in minimally invasive procedures is part of our department's strategic goal to reduce patient recovery time and improve outcomes. We've seen a 20% reduction in average length of stay for patients undergoing minimally invasive procedures compared to traditional open-heart surgeries."
    },
    {
      question: "What is the average length of stay for patients undergoing coronary artery bypass grafting (CABG) at our hospital?",
      answer: "The average length of stay for patients undergoing CABG at our hospital is currently 6.3 days.",
      extendedAnswer: "This has decreased from 7.1 days last year, thanks to improved post-operative care protocols and early mobilization strategies.",
      sources: 3,
      fullAnswer: "The average length of stay for patients undergoing CABG at our hospital is currently 6.3 days. This has decreased from 7.1 days last year, thanks to improved post-operative care protocols and early mobilization strategies. Our enhanced recovery after surgery (ERAS) protocol, implemented 8 months ago, has been a key factor in this improvement. The protocol includes pre-operative patient education, optimized pain management, and early post-operative mobilization. We've also seen a corresponding decrease in post-operative complications and readmission rates."
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating a search result
    const newChatItem = {
      query: searchQuery,
      answer: `Here's a simulated answer for "${searchQuery}". In a real application, this would be fetched from the RAG system.`
    }
    setChatHistory(prev => [newChatItem, ...prev])
    setSearchQuery('')
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const toggleSearchExpand = (index: number) => {
    setExpandedSearchIndex(expandedSearchIndex === index ? null : index)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Ask Nova</h2>
      </div>
      
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ask Nova about hospital-specific data or recruitment process..."
          className="flex-grow p-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
          <Search className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">Recent Searches</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chatHistory.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-[1.02]"
                onClick={() => toggleSearchExpand(index)}
              >
                <div className="flex items-center text-indigo-600 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-semibold">{item.query}</span>
                </div>
                <p className="text-gray-600 text-sm">{item.answer}</p>
                {item.thread && (
                  <div className="mt-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 flex items-center text-sm"
                    >
                      {expandedSearchIndex === index ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Hide thread
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          See thread
                        </>
                      )}
                    </button>
                    {expandedSearchIndex === index && (
                      <p className="mt-2 text-gray-600 text-sm">{item.thread}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {faqQuestions.slice(0, 4).map((faq, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-[1.02]"
                onClick={() => toggleExpand(index)}
              >
                <h4 className="font-semibold text-indigo-700 mb-2">{faq.question}</h4>
                <div className="text-gray-600 text-sm">
                  <p className="truncate">{faq.answer}</p>
                  {expandedIndex === index && (
                    <p className="mt-1">{faq.extendedAnswer}</p>
                  )}
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-indigo-500">Sources: {faq.sources}</span>
                  <button
                    className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 flex items-center text-sm"
                  >
                    {expandedIndex === index ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        See less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        See more
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}