import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import CredentialDetailView from './CredentialDetailView';

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  details: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: 'Application Received',
    date: '2023-05-01',
    status: 'completed',
    details: 'Initial application for Dr. Amy Collins received and processed.'
  },
  {
    id: 2,
    title: 'Primary Source Verification',
    date: '2023-05-15',
    status: 'completed',
    details: 'Medical school, residency, and fellowship credentials verified.'
  },
  {
    id: 3,
    title: 'License Verification',
    date: '2023-05-22',
    status: 'completed',
    details: 'State medical licenses verified for NY, CA, and TX.'
  },
  {
    id: 4,
    title: 'Background Check',
    date: '2023-06-01',
    status: 'in-progress',
    details: 'Criminal background check and OIG sanction list check in progress.'
  },
  {
    id: 5,
    title: 'Peer References',
    date: '2023-06-15',
    status: 'pending',
    details: 'Awaiting responses from 3 peer references.'
  },
  {
    id: 6,
    title: 'Committee Review',
    date: '2023-07-01',
    status: 'pending',
    details: 'Credentialing committee to review complete application.'
  },
  {
    id: 7,
    title: 'Board Approval',
    date: '2023-07-15',
    status: 'pending',
    details: 'Final approval by hospital board pending.'
  }
];

const CredentialTimeline: React.FC = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const toggleEventDetails = (eventId: number) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const openDetailView = (event: TimelineEvent) => {
    setSelectedEvent(event);
  };

  const closeDetailView = () => {
    setSelectedEvent(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="w-6 h-6 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-indigo-900">Credential Timeline</h2>
      <div className="relative">
        {timelineEvents.map((event, index) => (
          <div key={event.id} className="mb-8 flex items-center">
            <div className="flex flex-col items-center mr-4">
              <div className="rounded-full bg-white border-2 border-indigo-500 w-8 h-8 flex items-center justify-center">
                {getStatusIcon(event.status)}
              </div>
              {index < timelineEvents.length - 1 && (
                <div className="h-full border-l-2 border-indigo-300 my-2"></div>
              )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-indigo-700">{event.title}</h3>
                <span className="text-sm text-gray-500">{event.date}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Status: {event.status}</p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => toggleEventDetails(event.id)}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm focus:outline-none"
                >
                  {expandedEvent === event.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Hide details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show details
                    </>
                  )}
                </button>
                <button
                  onClick={() => openDetailView(event)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm focus:outline-none"
                >
                  View Full Details
                </button>
              </div>
              {expandedEvent === event.id && (
                <p className="mt-2 text-sm text-gray-600">{event.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <CredentialDetailView event={selectedEvent} onClose={closeDetailView} />
      )}
    </div>
  );
};

export default CredentialTimeline;