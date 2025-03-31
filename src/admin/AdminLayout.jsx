import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Overview from './Overview';
import StudentsList from './StudentsList';
import CollegeList from './CollegeList';
import ContactView from './ContactView';

const AdminLayout = () => {

  const [isPage, setIsPage] = useState('Dashboard');
  
  return (
    <>
      <div className="h-screen w-screen overflow-hidden grid grid-cols-4 bg-gradient-to-b from-indigo-900 to-indigo-700 ">
        <div>
          <Sidebar setIsPage={setIsPage} />
        </div>
        <div className="col-span-3 py-5 pe-5">
          <div className='bg-gray-100 h-full rounded-3xl p-10'>
            {
              isPage === 'Students' ? (
                <StudentsList />
              ) : isPage === 'Colleges' ? (
                <CollegeList />
              ) : isPage === 'Contact' ? (
                <ContactView />
              ) : (
                <Overview />
              )            
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout