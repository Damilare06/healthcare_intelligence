import React, { useState, useMemo } from 'react';
import { CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp, Database } from 'lucide-react';
import CredentialDetailView from './CredentialDetailView';

interface BlockchainLog {
  transactionId: string;
  issuingOrganization: string;
  timestamp: string;
  eventType: string;
  details: string;
}

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  details: string;
  blockchainData?: BlockchainLog;
}

interface CredentialTimelineProps {
  candidateName: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: 'Medical School Graduation',
    date: '2015-05-01',
    status: 'completed',
    details: 'Dr. Amy Collins graduated from Medical University of South Carolina.',
    blockchainData: {
      transactionId: '0x4d5e6f...',
      issuingOrganization: 'Medical University of South Carolina',
      timestamp: '2015-05-01T09:15:30Z',
      eventType: 'Graduation',
      details: 'Dr. Amy Collins graduated from Medical University of South Carolina.',
    }
  },
  {
    id: 2,
    title: 'Residency Completion',
    date: '2019-05-01',
    status: 'completed',
    details: 'Dr. Amy Collins completed her residency in Internal Medicine at Hospital B.',
    blockchainData: {
      transactionId: '0x7g8h9i...',
      issuingOrganization: 'Hospital B',
      timestamp: '2019-05-01T09:15:30Z',
      eventType: 'Residency',
      details: 'Dr. Amy Collins completed her residency in Internal Medicine at Hospital B.',
    }
  },
  {
    id: 3,
    title: 'Fellowship Completion',
    date: '2020-05-01',
    status: 'completed',
    details: 'Dr. Amy Collins completed her fellowship in Cardiology at Hospital C.',
    blockchainData: {
      transactionId: '0x1j2k3l...',
      issuingOrganization: 'Hospital C',
      timestamp: '2020-05-01T09:15:30Z',
      eventType: 'Fellowship',
      details: 'Dr. Amy Collins completed her fellowship in Cardiology at Hospital C.',
    }
  },
  {
    id: 4,
    title: 'Board Certification',
    date: '2021-05-01',
    status: 'completed',
    details: 'Dr. Amy Collins is board certified in Internal Medicine and Cardiology.',
    blockchainData: {
      transactionId: '0x4m5n6o...',
      issuingOrganization: 'American Board of Internal Medicine',
      timestamp: '2021-05-01T09:15:30Z',
      eventType: 'Certification',
      details: 'Dr. Amy Collins is board certified in Internal Medicine and Cardiology.',
    }
  },
  {
    id: 5,
    title: 'CME Completion',
    date: '2022-05-01',
    status: 'completed',
    details: 'Dr. Amy Collins completed 20 hours of CME in Cardiology.',
    blockchainData: {
      transactionId: '0x7p8q9r...',
      issuingOrganization: 'American Heart Association',
      timestamp: '2022-05-01T09:15:30Z',
      eventType: 'CME',
      details: 'Dr. Amy Collins completed 20 hours of CME in Cardiology.',
    }
  },
  {
    id: 6,
    title: 'License Verification',
    date: '2023-05-22',
    status: 'completed',
    details: 'State medical licenses verified for NY, CA, and TX.',
    blockchainData: {
      transactionId: '0x7g8h9i...',
      issuingOrganization: 'State Medical Boards',
      timestamp: '2023-05-22T11:45:20Z',
      eventType: 'License',
      details: 'State medical licenses verified for NY, CA, and TX.',
    }
  },
  {
    id: 7,
    title: 'NY License Renewal',
    date: '2023-06-01',
    status: 'completed',
    details: 'NY license renewed',
    blockchainData: {
      transactionId: '0x8i9j0k...',
      issuingOrganization: 'New York State Medical Board',
      timestamp: '2023-06-01T11:45:20Z',
      eventType: 'License',
      details: 'NY license renewed',
    }
  },
  {
    id: 8,
    title: 'CA License Renewal',
    date: '2023-07-01',
    status: 'completed',
    details: 'CA license renewed',
    blockchainData: {
      transactionId: '0x9j0k1l...',
      issuingOrganization: 'California Medical Board',
      timestamp: '2023-07-01T11:45:20Z',
      eventType: 'License',
      details: 'CA license renewed',
    }
  },
  {
    id: 9,
    title: 'TX License Renewal',
    date: '2023-08-01',
    status: 'completed',
    details: 'TX license renewed',
    blockchainData: {
      transactionId: '0x0k1l2m...',
      issuingOrganization: 'Texas Medical Board',
      timestamp: '2023-08-01T11:45:20Z',
      eventType: 'License',
      details: 'TX license renewed',
    }
  },
  {
    id: 10,
    title: 'Background Check',
    date: '2023-09-01',
    status: 'completed',
    details: 'Background check completed with no issues found.',
    blockchainData: {
      transactionId: '0x1l2m3n...',
      issuingOrganization: 'Background Check Agency',
      timestamp: '2023-09-01T10:00:00Z',
      eventType: 'Background Check',
      details: 'Background check completed with no issues found.',
    }
  },
];

const CredentialTimeline: React.FC<CredentialTimelineProps> = ({ candidateName }) => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [showBlockchainLogs, setShowBlockchainLogs] = useState(false);

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

  const toggleBlockchainLogs = () => {
    setShowBlockchainLogs(!showBlockchainLogs);
  };

  const handleTransactionClick = (transactionId: string) => {
    // Here you can implement the action when a transaction ID is clicked
    // For example, you could open a modal with more details or navigate to a blockchain explorer
    console.log(`Transaction ${transactionId} clicked`);
  };

  // Sort the timelineEvents by date, most recent first
  const sortedTimelineEvents = useMemo(() => {
    return [...timelineEvents].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Credential Timeline for {candidateName}</h2>
        <button
          onClick={toggleBlockchainLogs}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center"
        >
          <Database className="w-4 h-4 mr-2" />
          {showBlockchainLogs ? 'Hide' : 'Show'} Blockchain Logs
        </button>
      </div>

      {showBlockchainLogs && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">Blockchain Credential Logs</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Event</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Transaction ID</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Issuing Org.</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Timestamp</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5/12">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTimelineEvents
                  .filter(event => event.blockchainData)
                  .map(event => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-2 py-4 whitespace-normal text-sm text-gray-900">{event.title}</td>
                      <td className="px-2 py-4 whitespace-normal text-sm text-gray-500">
                        <button
                          onClick={() => handleTransactionClick(event.blockchainData?.transactionId || '')}
                          className="text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                        >
                          {event.blockchainData?.transactionId.slice(0, 10)}...
                        </button>
                      </td>
                      <td className="px-2 py-4 whitespace-normal text-sm text-gray-500">{event.blockchainData?.issuingOrganization}</td>
                      <td className="px-2 py-4 whitespace-normal text-sm text-gray-500">
                        {new Date(event.blockchainData?.timestamp || '').toLocaleString()}
                      </td>
                      <td className="px-2 py-4 whitespace-normal text-sm text-gray-500">{event.blockchainData?.details}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="relative">
        {sortedTimelineEvents.map((event, index) => (
          <div key={event.id} className="mb-8 flex items-center">
            <div className="flex flex-col items-center mr-4">
              <div className="rounded-full bg-white border-2 border-indigo-500 w-8 h-8 flex items-center justify-center">
                {getStatusIcon(event.status)}
              </div>
              {index < sortedTimelineEvents.length - 1 && (
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