import React from 'react'
import * as Label from '@radix-ui/react-label'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Check, Circle } from 'lucide-react'

interface TimelineStep {
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

export default function FollowUpReporting() {
  const timelineSteps: TimelineStep[] = [
    { label: "Initial Screening", status: "completed" },
    { label: "Phone Interview", status: "completed" },
    { label: "On-site Interview", status: "current" },
    { label: "Reference Check", status: "upcoming" },
    { label: "Offer Negotiation", status: "upcoming" },
    { label: "Onboarding", status: "upcoming" },
  ]

  const nextSteps = [
    "Schedule second interview with department head",
    "Request additional references",
    "Prepare offer package",
    "Conduct background check"
  ]

  const feedback = "Dr. Amy Collins is an excellent candidate for the Head of Cardiothoracic Surgery position. Her extensive experience, research background, and leadership skills make her a strong fit for our needs. Recommend moving forward with the next steps in the hiring process."

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-900">Follow-Up & Reporting</h2>
      
      <div>
        <Label.Root className="text-lg font-semibold text-indigo-900">Recruitment Timeline</Label.Root>
        <div className="mt-4 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
          <div className="relative flex justify-between">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  step.status === 'completed' ? 'bg-green-500' :
                  step.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  {step.status === 'completed' ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="mt-2 text-xs text-center w-20">
                  <span className={`font-medium ${
                    step.status === 'completed' ? 'text-green-600' :
                    step.status === 'current' ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Label.Root className="text-lg font-semibold text-indigo-900">Next Steps</Label.Root>
        <ScrollArea.Root className="h-[150px] w-full mt-2 p-4 bg-indigo-50 rounded-lg">
          <ScrollArea.Viewport className="h-full w-full">
            <ul className="list-disc pl-5">
              {nextSteps.map((step, index) => (
                <li key={index} className="mb-2">{step}</li>
              ))}
            </ul>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>

      <div>
        <Label.Root className="text-lg font-semibold text-indigo-900">Recruiter Feedback</Label.Root>
        <p className="mt-2 p-4 bg-indigo-50 rounded-lg">{feedback}</p>
      </div>

      <div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">Generate Report</button>
      </div>
    </div>
  )
}