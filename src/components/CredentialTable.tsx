import React, { useState, useEffect, useRef } from 'react'
import { MoreVertical, Database, User, FileCheck, Shield, Users, Building, CheckSquare, Eye, EyeOff, Search, Filter, MoreHorizontal } from 'lucide-react'
import { PSV, BackgroundCheck, CommitteeReview, PeerReferences, HospitalPrivileges, FinalApproval } from './CredentialingComponents'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CredentialSummaryTimeline from './CredentialSummaryTimeline';

const mockData = [
  {
    id: 1,
    name: 'Dr. Amy Collins',
    medicalLicense: '456xxxxxxx',
    providerNumber: '87-xxxxxxx',
    specialty: 'Cardiothoracic Surgery',
    stateLicenses: ['TX', 'NY', 'CA'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    medicalLicense: '789xxxxxxx',
    providerNumber: '65-xxxxxxx',
    specialty: 'Cardiologist',
    stateLicenses: ['NY', 'NJ', 'PA'],
    licenseStatus: 'Approved',
    offerStatus: 'Pending',
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    medicalLicense: '123xxxxxxx',
    providerNumber: '54-xxxxxxx',
    specialty: 'Neurologist',
    stateLicenses: ['CA', 'WA', 'OR'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 4,
    name: 'Dr. David Lee',
    medicalLicense: '234xxxxxxx',
    providerNumber: '43-xxxxxxx',
    specialty: 'Oncologist',
    stateLicenses: ['FL', 'GA', 'SC'],
    licenseStatus: 'Pending',
    offerStatus: 'Considering',
  },
  {
    id: 5,
    name: 'Dr. Emily Rodriguez',
    medicalLicense: '345xxxxxxx',
    providerNumber: '32-xxxxxxx',
    specialty: 'Dermatologist',
    stateLicenses: ['TX', 'OK', 'AR'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 6,
    name: 'Dr. James Wilson',
    medicalLicense: '567xxxxxxx',
    providerNumber: '21-xxxxxxx',
    specialty: 'Orthopedic Surgeon',
    stateLicenses: ['GA', 'AL', 'MS'],
    licenseStatus: 'Approved',
    offerStatus: 'Pending',
  },
  {
    id: 7,
    name: 'Dr. Maria Garcia',
    medicalLicense: '678xxxxxxx',
    providerNumber: '10-xxxxxxx',
    specialty: 'Psychiatrist',
    stateLicenses: ['TX', 'LA', 'NM'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 8,
    name: 'Dr. Robert Kim',
    medicalLicense: '890xxxxxxx',
    providerNumber: '98-xxxxxxx',
    specialty: 'Gastroenterologist',
    stateLicenses: ['NY', 'VT', 'ME'],
    licenseStatus: 'Pending',
    offerStatus: 'Considering',
  },
  {
    id: 9,
    name: 'Dr. Lisa Brown',
    medicalLicense: '901xxxxxxx',
    providerNumber: '87-xxxxxxx',
    specialty: 'Endocrinologist',
    stateLicenses: ['CA', 'NV', 'AZ'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 10,
    name: 'Dr. Thomas Anderson',
    medicalLicense: '012xxxxxxx',
    providerNumber: '76-xxxxxxx',
    specialty: 'Pulmonologist',
    stateLicenses: ['FL', 'NC', 'VA'],
    licenseStatus: 'Approved',
    offerStatus: 'Pending',
  },
  {
    id: 11,
    name: 'Dr. Jennifer Taylor',
    medicalLicense: '135xxxxxxx',
    providerNumber: '65-xxxxxxx',
    specialty: 'Rheumatologist',
    stateLicenses: ['TX', 'CO', 'UT'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 12,
    name: 'Dr. Christopher Lee',
    medicalLicense: '246xxxxxxx',
    providerNumber: '54-xxxxxxx',
    specialty: 'Urologist',
    stateLicenses: ['NY', 'RI', 'CT'],
    licenseStatus: 'Pending',
    offerStatus: 'Considering',
  },
  {
    id: 13,
    name: 'Dr. Amanda Martinez',
    medicalLicense: '357xxxxxxx',
    providerNumber: '43-xxxxxxx',
    specialty: 'Nephrologist',
    stateLicenses: ['CA', 'HI', 'WA'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 14,
    name: 'Dr. Daniel White',
    medicalLicense: '468xxxxxxx',
    providerNumber: '32-xxxxxxx',
    specialty: 'Hematologist',
    stateLicenses: ['FL', 'TN', 'KY'],
    licenseStatus: 'Approved',
    offerStatus: 'Pending',
  },
  {
    id: 15,
    name: 'Dr. Rachel Green',
    medicalLicense: '579xxxxxxx',
    providerNumber: '21-xxxxxxx',
    specialty: 'Allergist',
    stateLicenses: ['TX', 'MO', 'IA'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 16,
    name: 'Dr. Kevin Patel',
    medicalLicense: '680xxxxxxx',
    providerNumber: '10-xxxxxxx',
    specialty: 'Ophthalmologist',
    stateLicenses: ['NY', 'NJ', 'DE'],
    licenseStatus: 'Pending',
    offerStatus: 'Considering',
  },
  {
    id: 17,
    name: 'Dr. Olivia Thompson',
    medicalLicense: '791xxxxxxx',
    providerNumber: '98-xxxxxxx',
    specialty: 'Anesthesiologist',
    stateLicenses: ['CA', 'OR', 'ID'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 18,
    name: 'Dr. William Clark',
    medicalLicense: '802xxxxxxx',
    providerNumber: '87-xxxxxxx',
    specialty: 'Radiologist',
    stateLicenses: ['FL', 'SC', 'GA'],
    licenseStatus: 'Approved',
    offerStatus: 'Pending',
  },
  {
    id: 19,
    name: 'Dr. Sophia Nguyen',
    medicalLicense: '913xxxxxxx',
    providerNumber: '76-xxxxxxx',
    specialty: 'Infectious Disease Specialist',
    stateLicenses: ['TX', 'OK', 'LA'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 20,
    name: 'Dr. Alexander Ross',
    medicalLicense: '024xxxxxxx',
    providerNumber: '65-xxxxxxx',
    specialty: 'Geriatrician',
    stateLicenses: ['NY', 'PA', 'NJ'],
    licenseStatus: 'Pending',
    offerStatus: 'Considering',
  },
  {
    id: 21,
    name: 'Dr. Natalie Wong',
    medicalLicense: '135xxxxxxx',
    providerNumber: '54-xxxxxxx',
    specialty: 'Neonatologist',
    stateLicenses: ['CA', 'NV', 'AZ'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
  {
    id: 22,
    name: 'Dr. Eric Simmons',
    medicalLicense: '246xxxxxxx',
    providerNumber: '43-xxxxxxx',
    specialty: 'Vascular Surgeon',
    stateLicenses: ['FL', 'AL', 'MS'],
    licenseStatus: 'Approved',
    offerStatus: 'Pending',
  },
  {
    id: 23,
    name: 'Dr. Samantha Baker',
    medicalLicense: '357xxxxxxx',
    providerNumber: '32-xxxxxxx',
    specialty: 'Emergency Medicine Physician',
    stateLicenses: ['CA', 'WA', 'OR'],
    licenseStatus: 'Approved',
    offerStatus: 'Accepted',
  },
];

const generateMockTimelineEvents = (candidateId: number) => {
  // This function should generate or fetch real timeline events for each candidate
  // For now, we'll use mock data
  return [
    { id: `${candidateId}-1`, date: '2020-01-15', type: 'license', status: 'active', details: 'NY Medical License Issued' },
    { id: `${candidateId}-2`, date: '2020-03-20', type: 'certification', status: 'active', details: 'Board Certification in Cardiothoracic Surgery' },
    { id: `${candidateId}-3`, date: '2021-05-10', type: 'cme', status: 'completed', details: 'Completed 50 CME credits' },
    { id: `${candidateId}-4`, date: '2022-02-01', type: 'license', status: 'active', details: 'CA Medical License Issued' },
    { id: `${candidateId}-5`, date: '2022-11-30', type: 'disciplinary', status: 'issue', details: 'Minor disciplinary action - resolved' },
    { id: `${candidateId}-6`, date: '2023-01-15', type: 'license', status: 'pending', details: 'TX Medical License Application Submitted' },
    { id: `${candidateId}-7`, date: '2023-06-30', type: 'certification', status: 'expired', details: 'BLS Certification Expired' },
  ];
};

export default function CredentialTable() {
  const [activeTab, setActiveTab] = useState('database')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeSpecificTab, setActiveSpecificTab] = useState('psv')
  const [openActionId, setOpenActionId] = useState<number | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm] = useState('')
  const [columnFilters, setColumnFilters] = useState({
    specialty: '',
    licenseStatus: '',
    offerStatus: '',
    stateLicenses: ''
  });
  const [showTimelinePopup, setShowTimelinePopup] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenActionId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Helper functions to get unique values for each filter category
  const getUniqueSpecialties = () => Array.from(new Set(mockData.map(item => item.specialty))).sort();
  const getUniqueStatuses = () => Array.from(new Set(mockData.flatMap(item => [item.licenseStatus, item.offerStatus]))).sort();
  const getUniqueLicenseStatuses = () => Array.from(new Set(mockData.map(item => item.licenseStatus))).sort();
  const getUniqueOfferStatuses = () => Array.from(new Set(mockData.map(item => item.offerStatus))).sort();
  const getUniqueStateLicenses = () => Array.from(new Set(mockData.flatMap(item => item.stateLicenses))).sort();

  const handleColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({ ...prev, [column]: value }));
  };

  const filteredData = mockData.filter(item => {
    return (
      (columnFilters.specialty === '' || item.specialty === columnFilters.specialty) &&
      (columnFilters.licenseStatus === '' || item.licenseStatus === columnFilters.licenseStatus) &&
      (columnFilters.offerStatus === '' || item.offerStatus === columnFilters.offerStatus) &&
      (columnFilters.stateLicenses === '' || item.stateLicenses.includes(columnFilters.stateLicenses)) &&
      (searchTerm === '' || Object.values(item).some(val => 
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  });

  const renderSearchAndFilter = () => (
    <div className="mb-6">
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex justify-center">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )

  const handleNameClick = (item: any) => {
    setSelectedCandidate(item);
    setShowTimelinePopup(true);
  };

  const handleClosePopup = () => {
    setShowTimelinePopup(false);
    // Don't reset selectedCandidate here
  };

  const handleViewFullHistory = () => {
    if (selectedCandidate) {
      router.push(`/credentialing/${selectedCandidate.id}`);
    }
  };

  const renderDatabaseTable = () => (
    <>
      {renderSearchAndFilter()}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>Name</span>
                  <div className="mt-1 invisible">
                    <select className="block w-full text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>Specialty</span>
                  <div className="mt-1">
                    <select
                      onChange={(e) => handleColumnFilter('specialty', e.target.value)}
                      className="block w-full text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                    >
                      <option value="">All</option>
                      {getUniqueSpecialties().map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>Medical License</span>
                  <div className="mt-1 invisible">
                    <select className="block w-full text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>Provider Number</span>
                  <div className="mt-1 invisible">
                    <select className="block w-full text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </th>
              <th className="hidden xl:table-cell px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" style={{ width: '166px' }}>
                <div className="flex flex-col">
                  <span>State Licenses</span>
                  <div className="mt-1">
                    <select
                      onChange={(e) => handleColumnFilter('stateLicenses', e.target.value)}
                      className="block w-full text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                    >
                      <option value="">All</option>
                      {getUniqueStateLicenses().map(license => (
                        <option key={license} value={license}>{license}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>License Status</span>
                  <div className="mt-1">
                    <select
                      onChange={(e) => handleColumnFilter('licenseStatus', e.target.value)}
                      className="block w-full text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                    >
                      <option value="">All</option>
                      {getUniqueLicenseStatuses().map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>Offer Status</span>
                  <div className="mt-1">
                    <select
                      onChange={(e) => handleColumnFilter('offerStatus', e.target.value)}
                      className="block w-full text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                    >
                      <option value="">All</option>
                      {getUniqueOfferStatuses().map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>Actions</span>
                  <div className="mt-1 invisible">
                    <select className="block w-full text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.slice(0, rowsPerPage).map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <button 
                    onClick={() => handleNameClick(item)}
                    className="text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    {item.name}
                  </button>
                </td>
                <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.specialty}</td>
                <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.medicalLicense}</td>
                <td className="hidden lg:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.providerNumber}</td>
                <td className="hidden xl:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500" style={{ width: '166px' }}>
                  <div className="flex flex-wrap gap-1">
                    {item.stateLicenses.slice(0, 3).map((license, index) => (
                      <span key={index} className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {license}
                      </span>
                    ))}
                    {item.stateLicenses.length > 3 && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 flex items-center">
                        <MoreHorizontal className="w-4 h-4 mr-1" />
                        {item.stateLicenses.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.licenseStatus === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.licenseStatus}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.offerStatus === 'Accepted' ? 'bg-green-100 text-green-800' : 
                    item.offerStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.offerStatus}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex justify-center space-x-2">
                    <Link 
                      href={`/credentialing/${item.id}/timeline`}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Timeline
                    </Link>
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setDropdownPosition({
                          top: rect.bottom + window.scrollY,
                          left: rect.left + window.scrollX,
                        });
                        setOpenActionId(openActionId === item.id ? null : item.id);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-700">
            Showing {Math.min(rowsPerPage, filteredData.length)} of {filteredData.length} entries
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-700">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </>
  )

  const renderSpecificCandidate = () => {
    const credentialingTabs = [
      { id: 'psv', label: 'PSV', icon: FileCheck, component: PSV },
      { id: 'background', label: 'Background', icon: Shield, component: BackgroundCheck },
      { id: 'committee', label: 'Committee', icon: Users, component: CommitteeReview },
      { id: 'references', label: 'References', icon: Users, component: PeerReferences },
      { id: 'privileges', label: 'Privileges', icon: Building, component: HospitalPrivileges },
      { id: 'contract', label: 'Contract', icon: CheckSquare, component: FinalApproval },
    ]

    const ActiveComponent = credentialingTabs.find(tab => tab.id === activeSpecificTab)?.component || PSV

    return (
      <div className="w-full">
        <div className="flex w-full mb-8 bg-indigo-100 rounded-xl p-1 overflow-x-auto">
          {credentialingTabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 flex items-center justify-center p-3 rounded-lg transition-all duration-300 ease-in-out ${
                activeSpecificTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-md transform scale-105'
                  : 'text-indigo-600 hover:bg-indigo-200'
              }`}
              onClick={() => setActiveSpecificTab(tab.id)}
            >
              <tab.icon className={`w-5 h-5 mr-2 ${activeSpecificTab === tab.id ? 'text-indigo-600' : 'text-indigo-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-8 bg-gray-50 rounded-xl shadow-md p-6">
          <ActiveComponent />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md bg-indigo-100 rounded-xl p-1 flex">
          <button
            className={`flex-1 flex items-center justify-center p-2 sm:p-3 rounded-lg transition-all duration-300 ease-in-out text-sm sm:text-base ${
              activeTab === 'database'
                ? 'bg-white text-indigo-600 shadow-md transform scale-105'
                : 'text-indigo-600 hover:bg-indigo-200'
            }`}
            onClick={() => setActiveTab('database')}
          >
            <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="whitespace-nowrap">Credential Database</span>
          </button>
          <button
            className={`flex-1 flex items-center justify-center p-2 sm:p-3 rounded-lg transition-all duration-300 ease-in-out text-sm sm:text-base ${
              activeTab === 'specific'
                ? 'bg-white text-indigo-600 shadow-md transform scale-105'
                : 'text-indigo-600 hover:bg-indigo-200'
            }`}
            onClick={() => setActiveTab('specific')}
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="whitespace-nowrap">Specific Candidate</span>
          </button>
        </div>
      </div>

      {activeTab === 'database' && renderDatabaseTable()}
      {activeTab === 'specific' && renderSpecificCandidate()}

      {openActionId !== null && (
        <div 
          className="fixed bg-white rounded-md shadow-lg z-10 py-1" 
          ref={dropdownRef}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {/* Implement view functionality */}}
          >
            <Eye className="h-4 w-4 inline-block mr-2" />
            View
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {/* Implement hide functionality */}}
          >
            <EyeOff className="h-4 w-4 inline-block mr-2" />
            Hide
          </button>
        </div>
      )}

      {showTimelinePopup && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CredentialSummaryTimeline 
              candidate={selectedCandidate}
              fullTimelineEvents={generateMockTimelineEvents(selectedCandidate.id)}
              onClose={handleClosePopup}
              onViewFullHistory={handleViewFullHistory}
            />
          </div>
        </div>
      )}
    </div>
  )
}