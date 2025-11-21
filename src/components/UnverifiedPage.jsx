// src/components/UnverifiedPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeCheck, Loader, Clock } from 'lucide-react'; // Added Clock for pending
import api from '@/utils/api';
import Navbar from '@/mechanic/componets/Navbar';

const UnverifiedPage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/Profile/MechanicProfile/');
        setProfileData(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader className="animate-spin w-6 h-6" />
          <span>Loading profile...</span>
        </div>
      );
    }

    const isVerified = profileData?.is_verified;
    const hasSubmittedKyc = !!profileData?.KYC_document; // Use !! to cast to boolean

    // State 1: VERIFIED
    if (isVerified) {
      return (
        <>
          <BadgeCheck className="w-16 h-16 mb-4 text-green-500" />
          <h1 className="text-2xl font-semibold mb-2 text-green-600">
            Account Verified
          </h1>
          <p className="text-gray-700 mb-6">
            Your account has been successfully verified. You can now access all features.
          </p>
          <button
           onClick={() => window.location.href = '/'}// Navigate to mechanic dashboard
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            Go to Dashboard
          </button>
        </>
      );
    }

    // State 2: PENDING (Submitted but not verified)
    if (hasSubmittedKyc) {
      return (
        <>
          <Clock className="w-16 h-16 mb-4 text-yellow-500" />
          <h1 className="text-2xl font-semibold mb-2 text-yellow-600">
            Verification Pending
          </h1>
          <p className="text-gray-700 mb-6">
            Your KYC document has been submitted and is awaiting review. This may take 24-48 hours.
          </p>
       
        </>
      );
    }

    // State 3: NOT VERIFIED (Nothing submitted)
    return (
      <>
        <BadgeCheck className="w-16 h-16 mb-4 text-red-500" />
        <h1 className="text-2xl font-semibold mb-2 text-red-600">
          Account Not Verified
        </h1>
        <p className="text-gray-700 mb-6">
          Please complete your KYC to get full access to your mechanic profile.
        </p>
        <button
          onClick={() => navigate('/form')} // Navigate to the KYC form
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
        >
          Complete Your KYC
        </button>
      </>
    );
  };

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center flex flex-col items-center justify-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UnverifiedPage;