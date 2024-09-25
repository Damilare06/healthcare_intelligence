import React, { useState } from 'react'
import * as Label from '@radix-ui/react-label'
import * as Progress from '@radix-ui/react-progress'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Mic, AlertCircle, Phone, ExternalLink } from 'lucide-react'

interface ConversationItem {
  speaker: string;
  text: string;
  source?: string;
}

interface DuringCallProps {
  candidatePhoneNumber: string;
}

export default function DuringCall({ candidatePhoneNumber }: DuringCallProps) {
  const [phoneNumber, setPhoneNumber] = useState(candidatePhoneNumber)

  const conversation: ConversationItem[] = [
    { speaker: "Recruiter", text: "Hello Dr. Collins, this is Alex from Central Hospital. How are you today?" },
    { speaker: "Dr. Collins", text: "Hello Alex, I'm doing well, thank you. I'm looking forward to learning more about the position." },
    { speaker: "Recruiter", text: "Great! I'd be happy to discuss the Head of Cardiothoracic Surgery role with you. What would you like to know?" },
    { speaker: "Dr. Collins", text: "Could you tell me about the typical work schedule for this position?" },
    { 
      speaker: "Nova", 
      text: "Based on Central Hospital's data from the last quarter, the Head of Cardiothoracic Surgery averages 55 hours per week, with 45 hours dedicated to clinical duties and 10 hours to administrative tasks.",
      source: "Central Hospital Workforce Management System"
    },
    { speaker: "Recruiter", text: "Certainly. At Central Hospital, the role typically involves about 55 hours per week. This is usually split between 45 hours of clinical work and 10 hours of administrative duties. The position also includes on-call responsibilities every fourth weekend." },
    { speaker: "Dr. Collins", text: "I see. What's the average patient load and case mix I can expect?" },
    { 
      speaker: "Nova", 
      text: "In the last month, Central Hospital's Cardiothoracic department handled an average of 22 inpatients daily. The surgical case mix was 55% coronary procedures, 35% valve surgeries, and 10% other complex cases, totaling 48 major surgeries.",
      source: "Central Hospital Electronic Health Records System"
    },
    { speaker: "Recruiter", text: "Based on our recent data, you'd be overseeing an average of 22 inpatients daily. In terms of surgeries, last month we performed 48 major procedures. The case mix was approximately 55% coronary procedures, 35% valve surgeries, and 10% other complex cases." },
    { speaker: "Dr. Collins", text: "That's helpful. What are the main operational responsibilities beyond surgery?" },
    { 
      speaker: "Nova", 
      text: "The current Head of Cardiothoracic Surgery at Central Hospital spends about 20% of their time on department management, 15% on quality improvement, 10% on budget oversight, and 5% on hospital committees. They also dedicate 6 hours per week to the residency program.",
      source: "Central Hospital Department Head Job Description and Time Allocation Report"
    },
    { speaker: "Recruiter", text: "As the department head, you'd have several key responsibilities beyond surgery. This includes spending about 20% of your time on department management, 15% on quality improvement initiatives, 10% on budget oversight, and 5% participating in hospital committees. Additionally, you'd contribute about 6 hours per week to our residency program." },
    { speaker: "Dr. Collins", text: "Understood. Is there protected time for research or academic pursuits?" },
    { 
      speaker: "Nova", 
      text: "Central Hospital allocates 15% of the Head of Cardiothoracic Surgery's time for research and academic activities. Last year, this resulted in 5 peer-reviewed publications and 3 conference presentations from the current department head.",
      source: "Central Hospital Academic Affairs Annual Report"
    },
    { speaker: "Recruiter", text: "Yes, we value research and academic contributions highly. We allocate 15% of your time for these pursuits. To give you an idea, our current department head used this time to produce 5 peer-reviewed publications and deliver 3 conference presentations last year." },
    { speaker: "Dr. Collins", text: "That's great to hear. Could you provide some details about the contract terms?" },
    { 
      speaker: "Nova", 
      text: "Central Hospital's standard contract for this position is 3 years. The current salary range is $450,000 to $600,000, with a performance bonus of up to 20%. Last year's average total compensation for this role was $585,000.",
      source: "Central Hospital HR Compensation Report"
    },
    { speaker: "Recruiter", text: "Certainly. We're offering a 3-year initial contract. The base salary range is $450,000 to $600,000, depending on experience, plus a performance bonus of up to 20%. For context, the average total compensation for this role last year was $585,000." },
    { speaker: "Dr. Collins", text: "What about benefits and malpractice insurance?" },
    { 
      speaker: "Nova", 
      text: "Central Hospital offers a comprehensive benefits package valued at approximately $150,000 annually. This includes health, dental, and vision insurance, a 6% 401(k) match, and 30 days of paid time off. Malpractice insurance with $5 million coverage is fully paid by the hospital.",
      source: "Central Hospital Benefits Summary and Insurance Policy"
    },
    { speaker: "Recruiter", text: "We offer a comprehensive benefits package valued at about $150,000 per year. This includes health, dental, and vision insurance, a 6% 401(k) match, and 30 days of paid time off. Malpractice insurance is fully covered by the hospital, with $5 million in coverage." },
    { speaker: "Dr. Collins", text: "Thank you for all this information. What are the next steps in the process?" },
    { 
      speaker: "Nova", 
      text: "Central Hospital's standard hiring process for this position includes an on-site visit, meetings with key staff, and a presentation to the surgical team. The process typically takes 4-6 weeks from this stage to a final decision.",
      source: "Central Hospital Recruitment Process Guidelines"
    },
    { speaker: "Recruiter", text: "The next step would be an on-site visit to tour our facilities and meet the team. You'll have meetings with key staff members and we'd like you to give a presentation to our surgical team. From this point, we usually reach a final decision within 4-6 weeks." },
  ]

  const insights = [
    "Candidate shows strong interest in research opportunities",
    "Work-life balance is important to the candidate",
    "Candidate is interested in leadership and academic aspects",
    "Compensation package and contract terms are key considerations",
    "Candidate values professional development opportunities"
  ]

  const sentiment = "Very Positive"
  const callDuration = "15:30"

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-indigo-900">During Call</h2>
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
          <div>
            <Label.Root htmlFor="calling" className="block text-sm font-medium text-indigo-700">Calling</Label.Root>
            <p id="calling" className="text-lg font-bold text-indigo-900">{phoneNumber}</p>
          </div>
          <div className="text-right">
            <Label.Root htmlFor="duration" className="block text-sm font-medium text-indigo-700">Duration</Label.Root>
            <p id="duration" className="text-lg font-bold text-indigo-900">{callDuration}</p>
          </div>
        </div>
        
        {/* Phone Number Input */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter a candidate's phone number"
            className="w-full p-2 text-lg text-indigo-900 bg-indigo-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-300"
          />
        </div>

        <div className="flex space-x-4">
          <button className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">
            <Phone className="w-5 h-5 mr-2" />
            Dial
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-2 bg-white border border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300">
            <Mic className="w-5 h-5 mr-2" />
            Mute
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
            <Phone className="w-5 h-5 mr-2" />
            End Call
          </button>
        </div>
        <div>
          <Label.Root htmlFor="transcription" className="block text-lg font-semibold text-indigo-900 mb-2">Live Transcription</Label.Root>
          <ScrollArea.Root className="h-[400px] w-full overflow-hidden border border-indigo-200 rounded-lg bg-white shadow-inner-lg">
            <ScrollArea.Viewport className="h-full w-full p-4">
              {conversation.map((line, index) => (
                <div key={index} className={`mb-3 ${line.speaker === "Nova" ? "text-right" : ""}`}>
                  <div className={`inline-block max-w-[80%] ${line.speaker === "Nova" ? "bg-green-50 ml-auto" : "bg-indigo-50"} p-2 rounded-lg`}>
                    <p>
                      <strong className={`${line.speaker === "Nova" ? "text-green-700" : "text-indigo-700"}`}>
                        {line.speaker}:
                      </strong> {line.text}
                    </p>
                    {line.source && (
                      <a 
                        href={line.source} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-1 justify-end"
                      >
                        Source <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 mr-2 text-indigo-500" />
            <h3 className="text-lg font-semibold text-indigo-900">Nova Real-time Insights</h3>
          </div>
          <ScrollArea.Root className="h-[100px] w-full overflow-hidden">
            <ScrollArea.Viewport className="h-full w-full">
              {insights.map((insight, index) => (
                <span key={index} className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {insight}
                </span>
              ))}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
        <div>
          <Label.Root htmlFor="sentiment" className="block text-lg font-semibold text-indigo-900 mb-2">Sentiment Analysis</Label.Root>
          <div className="flex items-center space-x-4">
            <Progress.Root className="w-full h-4 bg-indigo-100 rounded-full overflow-hidden" value={100}>
              <Progress.Indicator className="h-full bg-indigo-500 transition-all duration-500 ease-out" style={{ width: '100%' }} />
            </Progress.Root>
            <span className="font-medium text-indigo-700">{sentiment}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
