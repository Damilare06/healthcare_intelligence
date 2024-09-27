import React from 'react';
import { X, CheckCircle, AlertCircle, RefreshCw, Edit, MessageSquare } from 'lucide-react';

interface CredentialDetailViewProps {
  event: {
    id: number;
    title: string;
    date: string;
    status: 'completed' | 'in-progress' | 'pending';
    details: string;
  };
  onClose: () => void;
}

const CredentialDetailView: React.FC<CredentialDetailViewProps> = ({ event, onClose }) => {
  const blockchainData = {
    hash: '0x1234...5678',
    timestamp: '2023-06-15T14:30:00Z',
    verifiedBy: 'Central Credentialing Authority',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-900">{event.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-indigo-700">Status</h3>
            <div className="flex items-center mt-1">
              {event.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              ) : event.status === 'in-progress' ? (
                <RefreshCw className="w-5 h-5 text-yellow-500 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
              )}
              <span className="capitalize">{event.status}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-700">Date</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-700">Details</h3>
            <p>{event.details}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-700">Blockchain Verification</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p><strong>Hash:</strong> {blockchainData.hash}</p>
              <p><strong>Timestamp:</strong> {new Date(blockchainData.timestamp).toLocaleString()}</p>
              <p><strong>Verified By:</strong> {blockchainData.verifiedBy}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Update
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Renew
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-300 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Request Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default CredentialDetailView;