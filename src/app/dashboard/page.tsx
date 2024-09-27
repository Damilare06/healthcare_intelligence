'use client'

import React from 'react';
import { TrendingUp, TrendingDown, Briefcase, UserCheck, ClipboardList, Users, Clock, PlusCircle, Upload, FileText, ChevronRight, UserPlus } from 'lucide-react';
import Link from 'next/link';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon }) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <Icon className="w-8 h-8 text-indigo-600" />
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
        {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        {Math.abs(change)}% from last month
      </p>
    </div>
  );
};

interface CredentialCardProps {
  name: string;
  specialty: string;
  activeLicenses: string[];
  certifications: string[];
  nextRenewal: string;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ name, specialty, activeLicenses, certifications, nextRenewal }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-4">{specialty}</p>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Active Licenses:</h4>
        <div className="flex flex-wrap gap-1">
          {activeLicenses.map((license, index) => (
            <span key={index} className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {license}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Certifications:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Next Renewal:</span> {nextRenewal}
        </p>
        <Link href="/talent-screening" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-300 flex items-center">
          <UserPlus className="w-4 h-4 mr-1" />
          Screen
        </Link>
      </div>
    </div>
  );
};

interface ActivityItem {
  id: number;
  type: 'verification' | 'new-position' | 'pending' | 'approval' | 'rejection';
  description: string;
  timestamp: string;
}

const ActivityList: React.FC<{ activities: ActivityItem[] }> = ({ activities }) => {
  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'verification': return 'bg-green-500';
      case 'new-position': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'approval': return 'bg-indigo-500';
      case 'rejection': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start">
            <span className={`w-3 h-3 rounded-full mt-1.5 mr-3 ${getActivityColor(activity.type)}`}></span>
            <div className="flex-grow">
              <p className="text-sm text-gray-700">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {activity.timestamp}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ActionCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-indigo-800 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full bg-white text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-start border border-indigo-300">
          <PlusCircle className="w-5 h-5 mr-2" />
          Create New Profile
        </button>
        <button className="w-full bg-white text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-start border border-indigo-300">
          <Upload className="w-5 h-5 mr-2" />
          Import New Profile
        </button>
        <button className="w-full bg-white text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-start border border-indigo-300">
          <FileText className="w-5 h-5 mr-2" />
          Upload Resume
        </button>
        <button className="w-full bg-white text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-between border border-indigo-300">
          See More
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const metrics = [
    { title: 'Total Physicians', value: 1234, change: 20, icon: Users },
    { title: 'Open Positions', value: 45, change: -5, icon: Briefcase },
    { title: 'Pending Verifications', value: 89, change: 12, icon: ClipboardList },
    { title: 'Recruitment Progress', value: '68%', change: 8, icon: UserCheck },
  ];

  const credentialDetails = [
    {
      name: 'Dr. Amy Collins',
      specialty: 'Cardiothoracic Surgery',
      activeLicenses: ['TX', 'NY', 'CA'],
      certifications: ['American Board of Thoracic Surgery', 'Subspecialty Board in Congenital Cardiac Surgery'],
      nextRenewal: 'September 1, 2024',
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Cardiology',
      activeLicenses: ['CA', 'NY', 'TX'],
      certifications: ['American Board of Internal Medicine', 'Subspecialty Board in Cardiovascular Disease'],
      nextRenewal: 'March 15, 2024',
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Neurosurgery',
      activeLicenses: ['CA', 'WA'],
      certifications: ['American Board of Neurological Surgery'],
      nextRenewal: 'July 22, 2023',
    },
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Pediatrics',
      activeLicenses: ['NY', 'NJ', 'PA'],
      certifications: ['American Board of Pediatrics', 'Subspecialty Board in Pediatric Emergency Medicine'],
      nextRenewal: 'November 30, 2023',
    },
    {
      name: 'Dr. James Wilson',
      specialty: 'Orthopedic Surgery',
      activeLicenses: ['FL', 'GA', 'SC'],
      certifications: ['American Board of Orthopaedic Surgery', 'Subspecialty Certificate in Sports Medicine'],
      nextRenewal: 'June 15, 2023',
    },
  ];

  const recentActivities: ActivityItem[] = [
    { id: 1, type: 'verification', description: 'Dr. Emily Rodriguez - Medical license verified', timestamp: '2 hours ago' },
    { id: 2, type: 'new-position', description: 'New position opened: Cardiothoracic Surgeon', timestamp: '4 hours ago' },
    { id: 3, type: 'pending', description: 'Dr. Michael Chen - Awaiting board certification verification', timestamp: '6 hours ago' },
    { id: 4, type: 'approval', description: 'Dr. Sarah Johnson - Credentialing application approved', timestamp: '1 day ago' },
    { id: 5, type: 'verification', description: 'Dr. David Lee - Hospital privileges confirmed', timestamp: '1 day ago' },
    { id: 6, type: 'rejection', description: 'Dr. Lisa Brown - Application rejected due to incomplete documentation', timestamp: '2 days ago' },
    { id: 7, type: 'new-position', description: 'New position opened: Pediatric Neurologist', timestamp: '2 days ago' },
    { id: 8, type: 'verification', description: 'Dr. James Wilson - DEA license verified', timestamp: '3 days ago' },
    { id: 9, type: 'pending', description: 'Dr. Maria Garcia - Pending background check results', timestamp: '3 days ago' },
    { id: 10, type: 'approval', description: 'Dr. Robert Kim - Granted temporary privileges', timestamp: '4 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-800">Physician Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {credentialDetails.slice(0, 3).map((detail, index) => (
                <CredentialCard key={index} {...detail} />
              ))}
              <ActionCard />
              {credentialDetails.slice(3).map((detail, index) => (
                <CredentialCard key={index + 3} {...detail} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-800">Recent Activities</h2>
            <ActivityList activities={recentActivities} />
          </div>
        </div>
      </div>
    </div>
  );
}