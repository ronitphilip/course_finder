import React, { useState } from 'react';
import { Table, Button, Input } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCollege } from '../context/CollegeContext';
import { approveCollegeAPI, deleteCollegeAPI } from '../services/allAPI';
import toast from 'react-hot-toast';

const CollegeList = () => {

  const { colleges, refreshColleges } = useCollege();
  const [searchQuery, setSearchQuery] = useState('');

  const handleApprove = async (college_id) => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem("access_token")}` };
        const response = await approveCollegeAPI(college_id, headers);
        if (response.status === 200) {
          toast.success("College approved successfully!");
          refreshColleges();
        } else {
          toast.error("Failed to approve college.");
        }
      } catch (error) {
        console.error("Error approving college:", error);
        toast.error("Something went wrong!");
      }
    };
  
    const handleDelete = async (college_id) => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem("access_token")}` };
        const response = await deleteCollegeAPI(college_id, headers);
        if (response.status === 200) {
          toast.success("College deleted successfully!");
          refreshColleges();
        } else {
          toast.error("Failed to delete college.");
          console.log(response);
          
        }
      } catch (error) {
        console.error("Error deleting college:", error);
        toast.error("Something went wrong!");
      }
    };

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (logo) => <img src={logo} alt="College Logo" className="h-10" />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'district',
      key: 'district',
      render: (text, record) => `${record.street}, ${record.district}, ${record.state}`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        record.is_approved ? 
        <span className='text-green-700 font-semibold'>Approved</span> : 
        <span className='text-yellow-600 font-semibold'>Pending</span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          {!record.is_approved && <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => handleApprove(record.id)} />}
          <Button type="default" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} style={{ borderColor: "red", color: "red" }} onMouseEnter={(e) => { e.target.style.backgroundColor = "red"; e.target.style.color = "white"; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ""; e.target.style.color = "red"; }}/>
        </div>
      )
    }
  ];

  return (
    <>
      <div className='flex items-center justify-between mb-10'>
        <h1 className='text-2xl font-bold text-indigo-700 bg-white inline px-4 py-1 rounded-2xl'>Colleges</h1>
        <div className='flex items-center px-3 py-2'>
          <Input className='ml-2 transition-all duration-300 ' placeholder='Search colleges, locations' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className='bg-white rounded-2xl mt-7 h-133 w-262 overflow-hidden'>
        <Table columns={columns} dataSource={filteredColleges} rowKey="id" pagination={{ pageSize: 8 }}/>
      </div>
    </>
  );
};

export default CollegeList;
