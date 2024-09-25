import React from 'react'
import * as Label from '@radix-ui/react-label'
import * as Progress from '@radix-ui/react-progress'
import * as ScrollArea from '@radix-ui/react-scroll-area'

interface FitMetric {
  name: string;
  score: number;
}

export default function PostCallAnalysis() {
  const callSummary = "The call with Dr. Amy Collins went well. She expressed strong interest in the position and demonstrated extensive knowledge in cardiothoracic surgery. Her leadership experience aligns well with our requirements."

  const keyInsights = [
    "Candidate has 15 years of experience in cardiothoracic surgery",
    "Published 20+ research papers in reputable journals",
    "Led a team of 15 surgeons in her current role",
    "Interested in implementing new minimally invasive techniques",
    "Seeks opportunity to expand research initiatives"
  ]

  const candidateFit = 85 // percentage

  const fitMetrics: FitMetric[] = [
    { name: "Surgical Skills", score: 90 },
    { name: "Leadership Experience", score: 85 },
    { name: "Research Background", score: 95 },
    { name: "Cultural Fit", score: 80 },
    { name: "Vision Alignment", score: 85 },
    { name: "Communication Skills", score: 88 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-900">Post-Call Analysis</h2>
      
      <div>
        <Label.Root className="text-lg font-semibold text-indigo-900">Call Summary</Label.Root>
        <p className="mt-2 p-4 bg-indigo-50 rounded-lg">{callSummary}</p>
      </div>

      <div>
        <Label.Root className="text-lg font-semibold text-indigo-900">Key Insights</Label.Root>
        <ScrollArea.Root className="h-[200px] w-full mt-2 p-4 bg-indigo-50 rounded-lg">
          <ScrollArea.Viewport className="h-full w-full">
            <ul className="list-disc pl-5">
              {keyInsights.map((insight, index) => (
                <li key={index} className="mb-2">{insight}</li>
              ))}
            </ul>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>

      <div>
        <Label.Root className="text-lg font-semibold text-indigo-900">Candidate Fit</Label.Root>
        <div className="mt-2">
          <Progress.Root className="w-full h-4 bg-gray-200 rounded-full overflow-hidden" value={candidateFit}>
            <Progress.Indicator 
              className="h-full bg-green-500 transition-all duration-500 ease-in-out" 
              style={{ width: `${candidateFit}%` }} 
            />
          </Progress.Root>
          <p className="mt-1 text-right font-semibold text-green-700">{candidateFit}%</p>
        </div>
      </div>

      <div>
        <Label.Root className="text-lg font-semibold text-indigo-900">Fit Metrics</Label.Root>
        <div className="mt-2 space-y-4">
          {fitMetrics.map((metric, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-indigo-700">{metric.name}</span>
                <span className="text-sm font-medium text-indigo-700">{metric.score}%</span>
              </div>
              <Progress.Root className="w-full h-2 bg-gray-200 rounded-full overflow-hidden" value={metric.score}>
                <Progress.Indicator 
                  className="h-full bg-indigo-500 transition-all duration-500 ease-in-out" 
                  style={{ width: `${metric.score}%` }} 
                />
              </Progress.Root>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
