import React, { useState } from 'react';
import DashboardLayout from '../../Layouts/dashboardLayout';
import { useNavigate } from 'react-router-dom';
import AllHouses from '../House/AllHouses';
import AllRooms from '../Room/AllRooms';

import ContentCard from '../../components/Dashboard/ContentCard';
import TabNavigation from '../../components/Dashboard/TabNavigation';
import Footer from '../../components/Dashboard/Footer';
import Header from '../../components/Dashboard/Header';

const Home = () => {
  const [activeTab, setActiveTab] = useState('houses'); // Default to houses tab
  const navigate = useNavigate();

  const tabs = [
    { id: 'houses', label: 'Houses' },
    { id: 'rooms', label: 'Rooms' }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <Header
          onViewHouses={() => navigate('/houses')}
        />
        
        {/* Main Content */}
        <div className="flex-grow px-6 py-8">
          <ContentCard>
            {/* Tab Navigation */}
            <TabNavigation 
              tabs={tabs} 
              activeTab={activeTab} 
              onChange={setActiveTab} 
            />
            
            {/* Tab Content */}
            <div className="p-4">
              {activeTab === 'houses' && <AllHouses />}
              {activeTab === 'rooms' && <AllRooms />}
            </div>
          </ContentCard>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Home;