import React from 'react';

const MedicalLicenseVerification: React.FC = () => {
  return (
    <div className="medical-license-verification">
      <h2 className="text-xl font-bold mb-4">Medical License Verification</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-gray-100">Full Name</th>
            <th className="px-4 py-2 border bg-gray-100">Date of Birth</th>
            <th className="px-4 py-2 border bg-gray-100">State Medical License Number</th>
            <th className="px-4 py-2 border bg-gray-100">State</th>
            <th className="px-4 py-2 border bg-gray-100">Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">John Doe</td>
            <td className="px-4 py-2 border">1980-05-15</td>
            <td className="px-4 py-2 border">MD12345</td>
            <td className="px-4 py-2 border">California</td>
            <td className="px-4 py-2 border">2025-12-31</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Jane Smith</td>
            <td className="px-4 py-2 border">1975-09-22</td>
            <td className="px-4 py-2 border">NY54321</td>
            <td className="px-4 py-2 border">New York</td>
            <td className="px-4 py-2 border">2024-10-15</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MedicalLicenseVerification;