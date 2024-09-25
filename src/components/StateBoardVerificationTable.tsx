import React from 'react';

const StateBoardVerificationTable: React.FC = () => {
  return (
    <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
      <colgroup>
        <col style={{ width: '7%' }} /> {/* State (reduced by 30%) */}
        <col style={{ width: '10%' }} /> {/* Subspecialty Certification (reduced by 30%) */}
        <col style={{ width: '30%' }} /> {/* State Medical License Number (increased by 50%) */}
        <col style={{ width: '13%' }} /> {/* Date of Board Certification */}
        <col style={{ width: '13%' }} /> {/* Date of Board Recertification */}
        <col style={{ width: '9%' }} /> {/* Verification Status */}
        <col style={{ width: '9%' }} /> {/* License Status */}
        <col style={{ width: '9%' }} /> {/* Disciplinary Action History */}
      </colgroup>
      <thead>
        <tr>
          <th className="px-2 py-2 border text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
          <th className="px-2 py-2 border text-xs font-medium text-gray-500 uppercase tracking-wider">Subspecialty Certification</th>
          <th className="px-2 py-2 border text-xs font-medium text-gray-500 uppercase tracking-wider">State Medical License Number</th>
          <th className="px-2 py-2 border text-sm font-medium text-gray-500 uppercase tracking-wider">Date of Board Certification</th>
          <th className="px-2 py-2 border text-sm font-medium text-gray-500 uppercase tracking-wider">Date of Board Recertification</th>
          <th className="px-2 py-2 border text-xs font-medium text-gray-500 uppercase tracking-wider">Verification Status</th>
          <th className="px-2 py-2 border text-xs font-medium text-gray-500 uppercase tracking-wider">License Status</th>
          <th className="px-2 py-2 border text-xs font-medium text-gray-500 uppercase tracking-wider">Disciplinary Action History</th>
        </tr>
      </thead>
      <tbody>
        {/* Table rows would go here */}
        <tr>
          <td className="px-2 py-2 border text-sm">NY</td>
          <td className="px-2 py-2 border text-sm">Cardiology</td>
          <td className="px-2 py-2 border text-sm">123456789</td>
          <td className="px-2 py-2 border text-sm">2020-01-01</td>
          <td className="px-2 py-2 border text-sm">2025-01-01</td>
          <td className="px-2 py-2 border text-sm">Verified</td>
          <td className="px-2 py-2 border text-sm">Active</td>
          <td className="px-2 py-2 border text-sm">None</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StateBoardVerificationTable;