import React from 'react';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Clock, Calendar, AlertTriangle, Info, ChevronRight, X } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'license' | 'certification' | 'cme' | 'disciplinary';
  status: 'active' | 'pending' | 'expired' | 'issue';
  details: string;
}

interface CredentialSummaryTimelineProps {
  candidate?: any;
  fullTimelineEvents: TimelineEvent[];
  onClose?: () => void;
  onViewFullHistory?: () => void;
  showFullHistoryButton?: boolean;
}

const CredentialSummaryTimeline: React.FC<CredentialSummaryTimelineProps> = ({ 
  candidate, 
  fullTimelineEvents,
  onClose, 
  onViewFullHistory,
  showFullHistoryButton = true
}) => {
  const getEventColor = (event: TimelineEvent) => {
    switch (event.status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'expired': return 'bg-red-500';
      case 'issue': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  const getEventIcon = (event: TimelineEvent) => {
    switch (event.type) {
      case 'license': return <CheckCircle className="w-4 h-4" />;
      case 'certification': return <AlertCircle className="w-4 h-4" />;
      case 'cme': return <Calendar className="w-4 h-4" />;
      case 'disciplinary': return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const verificationProgress = fullTimelineEvents && fullTimelineEvents.length > 0
    ? Math.round((fullTimelineEvents.filter(event => event.status === 'active').length / fullTimelineEvents.length) * 100)
    : 0;

  // Select the 6 most recent events for the summary timeline
  const summaryTimelineEvents = fullTimelineEvents
    ? fullTimelineEvents
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6)
    : [];

  return (
    <div className="relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      )}
      <h3 className="text-xl font-semibold text-indigo-900 mb-4">
        Credential Summary {candidate ? `for ${candidate.name}` : ''}
      </h3>
      
      {/* Verification Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Verification Progress</span>
          <span className="text-sm font-medium text-indigo-600">{verificationProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${verificationProgress}%` }}></div>
        </div>
      </div>

      {/* Flagged Alerts */}
      {fullTimelineEvents && fullTimelineEvents.some(event => event.status === 'expired' || event.status === 'issue') && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Attention needed</p>
          <p>There are expired credentials or issues that require your attention.</p>
        </div>
      )}

      {/* Horizontal Timeline */}
      <div className="relative mt-8 mb-8">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200"></div>
        <div className="flex justify-between">
          {summaryTimelineEvents.map((event) => (
            <div 
              key={event.id}
              className="relative flex flex-col items-center cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-full ${getEventColor(event)} flex items-center justify-center text-white z-10`}>
                {getEventIcon(event)}
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-medium text-gray-900">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500 truncate w-20">{event.details}</p>
              </div>
              <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-white rounded shadow-lg border border-gray-200 z-20 w-48">
                <p className="text-sm">{event.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities and View Full Timeline */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-lg font-medium text-gray-900">Recent Activities</h4>
          {candidate && (
            <Link 
              href={`/credentialing/${candidate.id}/timeline`}
              className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
            >
              View Full Timeline
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          )}
        </div>
        {summaryTimelineEvents.slice(0, 3).map((event) => (
          <div key={event.id} className="flex items-center mb-2">
            <div className={`w-2 h-2 rounded-full ${getEventColor(event)} mr-2`}></div>
            <p className="text-sm text-gray-600">{event.details} - {new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Action Button */}
      {showFullHistoryButton && onViewFullHistory && (
        <button 
          onClick={onViewFullHistory}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300 flex items-center"
        >
          View Full Credential History
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      )}
    </div>
  );
};

export default CredentialSummaryTimeline;