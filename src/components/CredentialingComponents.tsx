import React, { useState } from 'react'
import { Save, PlusCircle } from 'lucide-react'

export const PSV = () => {
  const [psvData, setPsvData] = useState({
    // Medical License Verification
    fullName: 'Dr. Amy Collins',
    nationalProviderIdentifier: '1234567890',
    medicalLicenseNumber: '456xxxxxxx',
    
    // Residency Verification
    medicalSchool: 'University of Texas Medical Branch',
    graduationYear: '2012',
    residencyProgram: 'Baylor College of Medicine',
    fellowshipProgram: 'Texas Children\'s Hospital',
    fellowshipCompletionDate: '2019-06-30',
    
    // Medical Board Verification
    medicalBoardVerifications: [
      {
        state: 'New York',
        subspecialtyCertification: 'Pediatric Cardiology',
        stateBoardCertificationNumber: 'DEF123456',
        dateOfBoardCertification: '2020-07-15',
        dateOfBoardRecertification: '2025-07-15',
        verificationStatus: 'Verified'
      },
      {
        state: 'California',
        subspecialtyCertification: 'Pediatric Cardiology',
        stateBoardCertificationNumber: 'CAL789012',
        dateOfBoardCertification: '2019-09-01',
        dateOfBoardRecertification: '2024-09-01',
        verificationStatus: 'Pending'
      },
      {
        state: 'Texas',
        subspecialtyCertification: 'Pediatric Cardiology',
        stateBoardCertificationNumber: 'TEX345678',
        dateOfBoardCertification: '2021-03-30',
        dateOfBoardRecertification: '2026-03-30',
        verificationStatus: 'Expired'
      }
    ]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPsvData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleMedicalBoardInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    setPsvData(prevData => {
      const newMedicalBoardVerifications = [...prevData.medicalBoardVerifications];
      newMedicalBoardVerifications[index] = { ...newMedicalBoardVerifications[index], [name]: value };
      return { ...prevData, medicalBoardVerifications: newMedicalBoardVerifications };
    });
  };

  const addNewState = () => {
    setPsvData(prevData => ({
      ...prevData,
      medicalBoardVerifications: [
        ...prevData.medicalBoardVerifications,
        {
          state: '',
          subspecialtyCertification: '',
          stateBoardCertificationNumber: '',
          dateOfBoardCertification: '',
          dateOfBoardRecertification: '',
          verificationStatus: ''
        }
      ]
    }));
  };

  const renderSection = (title: string, fields: string[]) => (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">
      <h3 className="text-xl font-semibold text-indigo-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((key) => (
          <div key={key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            <input
              type={key.includes('Date') ? 'date' : 'text'}
              name={key}
              value={psvData[key as keyof typeof psvData]}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderMedicalBoardVerification = () => {
    const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case 'verified':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'expired':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4 mb-6">
        <h3 className="text-xl font-semibold text-indigo-800 mb-4">Medical Board Verification</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">State</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Subspecialty Certification</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">State Board Certification Number</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">Date of Board Certification</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">Date of Board Recertification</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Verification Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {psvData.medicalBoardVerifications.map((verification, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <select
                      name="state"
                      value={verification.state}
                      onChange={(e) => handleMedicalBoardInputChange(e, index)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select a state</option>
                      {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <input
                      type="text"
                      name="subspecialtyCertification"
                      value={verification.subspecialtyCertification}
                      onChange={(e) => handleMedicalBoardInputChange(e, index)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <input
                      type="text"
                      name="stateBoardCertificationNumber"
                      value={verification.stateBoardCertificationNumber}
                      onChange={(e) => handleMedicalBoardInputChange(e, index)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <input
                      type="date"
                      name="dateOfBoardCertification"
                      value={verification.dateOfBoardCertification}
                      onChange={(e) => handleMedicalBoardInputChange(e, index)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <input
                      type="date"
                      name="dateOfBoardRecertification"
                      value={verification.dateOfBoardRecertification}
                      onChange={(e) => handleMedicalBoardInputChange(e, index)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <select
                      name="verificationStatus"
                      value={verification.verificationStatus}
                      onChange={(e) => handleMedicalBoardInputChange(e, index)}
                      className={`w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${getStatusColor(verification.verificationStatus)}`}
                    >
                      <option value="Verified">Verified</option>
                      <option value="Pending">Pending</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addNewState}
          className="mt-4 bg-green-500 text-white px-3 py-1 text-sm rounded-md flex items-center hover:bg-green-600 transition-colors"
        >
          <PlusCircle className="w-4 h-4 mr-1" />
          Add New State
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Primary Source Verification</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>
      
      {renderSection("Medical License Verification", ['fullName', 'nationalProviderIdentifier', 'medicalLicenseNumber'])}
      
      {renderSection("Residency Verification", ['medicalSchool', 'graduationYear', 'residencyProgram', 'fellowshipProgram', 'fellowshipCompletionDate'])}
      
      {renderMedicalBoardVerification()}
    </div>
  );
};

export const BackgroundCheck = () => {
  const [backgroundData, setBackgroundData] = useState({
    socialSecurityNumber: '987-65-4321',
    criminalBackgroundCheck: 'No issues found',
    malpracticeHistory: 'No malpractice claims on record',
    sanctionsOrDisciplinaryActions: 'No sanctions or disciplinary actions reported',
    drugScreeningResults: 'Passed. No substances detected'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBackgroundData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-900">Background Check</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(backgroundData).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            {key === 'socialSecurityNumber' ? (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            ) : (
              <textarea
                name={key}
                value={value}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const CommitteeReview = () => {
  const [committeeData, setCommitteeData] = useState({
    recommendation: 'Approved',
    meetingDate: '2023-06-15',
    meetingNotes: 'Dr. Collins\' credentials and experience were reviewed. The committee unanimously approved her application.',
    additionalDocumentation: 'None required'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCommitteeData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-900">Credentialing Committee Review</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(committeeData).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            {key === 'recommendation' ? (
              <select
                name={key}
                value={value}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Considering">Considering</option>
              </select>
            ) : key === 'meetingDate' ? (
              <input
                type="date"
                name={key}
                value={value}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            ) : (
              <textarea
                name={key}
                value={value}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PeerReferences = () => {
  const [references, setReferences] = useState([
    {
      name: 'Dr. John Smith',
      email: 'john.smith@texaschildrens.org',
      phone: '(713) 555-1234',
      relationship: 'Fellowship Director',
      status: 'Verified'
    },
    {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@bcm.edu',
      phone: '(713) 555-5678',
      relationship: 'Residency Colleague',
      status: 'Verified'
    }
  ]);

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newReferences = [...references];
    newReferences[index] = { ...newReferences[index], [name]: value };
    setReferences(newReferences);
  };

  const addReference = () => {
    setReferences([...references, { name: '', email: '', phone: '', relationship: '', status: 'Pending' }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-900">Peer References</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>
      {references.map((reference, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(reference).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {key === 'status' ? (
                  <select
                    name={key}
                    value={value}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Verified">Verified</option>
                    <option value="Unable to Contact">Unable to Contact</option>
                  </select>
                ) : (
                  <input
                    type={key === 'email' ? 'email' : 'text'}
                    name={key}
                    value={value}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={addReference}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Reference
      </button>
    </div>
  );
};

export const HospitalPrivileges = () => {
  const [privileges, setPrivileges] = useState([
    {
      hospitalName: 'Texas Children\'s Hospital',
      privilegeType: 'Full Clinical Privileges',
      dateGranted: '2019-07-01',
      expirationDate: '2024-06-30',
      competencyDocumentation: 'Annual performance review, case logs, continuing education credits'
    }
  ]);

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newPrivileges = [...privileges];
    newPrivileges[index] = { ...newPrivileges[index], [name]: value };
    setPrivileges(newPrivileges);
  };

  const addPrivilege = () => {
    setPrivileges([...privileges, {
      hospitalName: '',
      privilegeType: '',
      dateGranted: '',
      expirationDate: '',
      competencyDocumentation: ''
    }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-900">Hospital Privileges Verification</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>
      {privileges.map((privilege, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(privilege).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </label>
                {key === 'competencyDocumentation' ? (
                  <textarea
                    name={key}
                    value={value}
                    onChange={(e) => handleInputChange(index, e)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <input
                    type={key.includes('Date') ? 'date' : 'text'}
                    name={key}
                    value={value}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={addPrivilege}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Privilege
      </button>
    </div>
  );
};

export const FinalApproval = () => {
  const [contractData, setContractData] = useState({
    startDate: '2023-09-01',
    duration: '3 years',
    salary: '$220,000 per year',
    signOnBonus: '$25,000',
    signedContract: null as File | null,
    otherStatements: 'Annual performance bonus of up to 15% based on quality metrics and patient satisfaction. Relocation assistance of up to $10,000 provided.'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContractData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setContractData(prevData => ({ ...prevData, signedContract: e.target.files![0] }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-900">Final Approval & Contract Signing</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(contractData).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            {key === 'signedContract' ? (
              <input
                type="file"
                name={key}
                onChange={handleFileChange}
                accept=".pdf"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            ) : (
              <input
                type={key.includes('Date') ? 'date' : 'text'}
                name={key}
                value={typeof value === 'string' ? value : ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};