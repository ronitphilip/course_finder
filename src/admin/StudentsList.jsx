import React, { useEffect, useState } from 'react';
import { Table, Input } from "antd";
import { useAdmin } from '../context/AdminContext';

const StudentsList = () => {

  const { loading, users } = useAdmin();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    if (users) {
      setFilteredStudents(users);
    }
  }, [users]);

  useEffect(() => {
    setFilteredStudents(
      users?.filter(user =>
        user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.street?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.state?.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [searchQuery, users]);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Qualification',
      dataIndex: 'highest_qualification',
      key: 'highest_qualification',
    },
    {
      title: 'Institute Name',
      dataIndex: 'school_name',
      key: 'school_name',
    },
    {
      title: 'Address',
      dataIndex: 'district',
      key: 'district',
      render: (text, record) => `${record.street}, ${record.district}, ${record.state}`
    },
  ];

  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <h1 className='text-2xl font-bold text-indigo-700 bg-white inline px-4 py-1 rounded-2xl'>Students</h1>
        <div className='flex items-center px-3 py-2'>
          <Input className='ml-2 transition-all duration-300 ' placeholder='Search users or locations' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className='bg-white rounded-2xl mt-7 h-133 w-262 overflow-hidden'>
        {
          loading ? (
            <p>Loading...</p>
          ) : (
            <Table columns={columns} dataSource={filteredStudents} rowKey="username" pagination={{ pageSize: 8 }} />
          )
        }
      </div>
    </>
  );
};

export default StudentsList;
