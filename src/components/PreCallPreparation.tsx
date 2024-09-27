import React from 'react'
import * as Label from '@radix-ui/react-label'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Download, Phone } from 'lucide-react'

interface PreCallPreparationProps {
  onStartCall: (phoneNumber: string) => void;
}

export default function PreCallPreparation({ onStartCall }: PreCallPreparationProps) {
  const candidateInfo = {
    name: "Dr. Amy Collins",
    currentPosition: "Senior Cardiothoracic Surgeon at City Hospital",  // Updated from "Senior Surgeon at City Hospital"
    yearsOfExperience: 15,
    specialization: "Cardiothoracic Surgery",  // Updated from "Cardiothoracic Surgery" if it was different before
    phoneNumber: "+1 (555) 123-4567",
    // ... other candidate information
  }

  const jobDetails = {
    title: "Head of Cardiothoracic Surgery",
    department: "Surgery",
    hospital: "Central Hospital",
    description: "We are seeking an experienced and visionary leader to head our Cardiothoracic Surgery department. The ideal candidate will have a strong track record in complex cardiothoracic procedures, a passion for research and innovation, and excellent leadership skills. This role involves overseeing a team of skilled surgeons, managing departmental operations, contributing to our residency program, and driving forward our hospital's reputation in cardiothoracic care.",
    // ... other job details
  }

  const talkingPoints = [
    "Discuss candidate's experience in leading surgical teams",
    "Inquire about research interests and publications",
    "Explore candidate's vision for developing the cardiothoracic department",
    // ... other talking points
  ]

  const handleResumeDownload = () => {
    // This is a placeholder function. In a real application, this would trigger the actual download.
    alert("Downloading resume... (This is a simulated action)")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-900">Pre-Call Preparation</h2>
      
      <div>
        <div className="flex justify-between items-start">
          <Label.Root className="text-lg font-semibold text-indigo-900">Candidate Information</Label.Root>
          <button
            onClick={handleResumeDownload}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </button>
        </div>
        <div className="mt-2 p-4 bg-indigo-50 rounded-lg">
          <p><strong>Name:</strong> {candidateInfo.name}</p>
          <p><strong>Current Position:</strong> {candidateInfo.currentPosition}</p>
          <p><strong>Years of Experience:</strong> {candidateInfo.yearsOfExperience}</p>
          <p><strong>Specialization:</strong> {candidateInfo.specialization}</p>
          <div className="flex items-center justify-between mt-2">
            <p><strong>Phone Number:</strong> {candidateInfo.phoneNumber}</p>
            <button
              onClick={() => onStartCall(candidateInfo.phoneNumber)}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </button>
          </div>
        </div>
      </div>

      <div>
        <Label.Root className="text-lg font-semibold text-indigo-900">Job Details</Label.Root>
        <div className="mt-2 p-4 bg-indigo-50 rounded-lg">
          <p><strong>Title:</strong> {jobDetails.title}</p>
          <p><strong>Department:</strong> {jobDetails.department}</p>
          <p><strong>Hospital:</strong> {jobDetails.hospital}</p>
          <div className="mt-2">
            <p><strong>Job Description:</strong></p>
            <p className="text-sm mt-1">{jobDetails.description}</p>
          </div>
        </div>
      </div>

      <div>
        <Label.Root className="text-lg font-semibold text-indigo-900">Talking Points</Label.Root>
        <ScrollArea.Root className="h-[200px] w-full mt-2 p-4 bg-indigo-50 rounded-lg">
          <ScrollArea.Viewport className="h-full w-full">
            <ul className="list-disc pl-5">
              {talkingPoints.map((point, index) => (
                <li key={index} className="mb-2">{point}</li>
              ))}
            </ul>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  )
}
