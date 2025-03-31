import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Input, Table } from 'antd';

const ContactView = () => {

  const { messages } = useAdmin();
    
    const [searchQuery, setSearchQuery] = useState('');
  
    const filterMessages = messages.filter(message => 
      message?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message?.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message?.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name  ',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
      },
    ];

  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <h1 className='text-2xl font-bold text-indigo-700 bg-white inline px-4 py-1 rounded-2xl'>Contact</h1>
        <div className='flex items-center px-3 py-2'>
          <Input className='ml-2 transition-all duration-300 ' placeholder='Search users or messages' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className='bg-white rounded-2xl mt-7 h-133 w-262 overflow-hidden'>
        <Table columns={columns} dataSource={filterMessages} rowKey="username" pagination={{ pageSize: 8 }} />
      </div>
    </>
  )
}

export default ContactView