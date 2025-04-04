import React, { useState } from "react";
import { Table, Button, Dropdown, Menu, Tag } from "antd";

const AppliedStudents = ({ newApplications, handleStatusUpdate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const updateStatus = async (studentId, newStatus) => {
    await handleStatusUpdate(studentId, newStatus);
    setDropdownOpen(null);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Email / Phone",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <>
          {record.email} <br /> {record.phone_number}
        </>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text, record) => (
        `${record.street}, ${record.district}, ${record.state}`
      ),
    },
    {
      title: "School & Qualification",
      dataIndex: "school_name",
      key: "school_name",
      render: (text, record) => (
        <>
          {record.school_name} <br /> ({record.highest_qualification}, {Math.floor(record.marks_percentage)}%)
        </>
      ),
    },
    {
      title: "Course",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColors = {
          approved: "green",
          rejected: "red",
          pending: "yellow",
        };
        return <Tag color={statusColors[status] || "blue"}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => updateStatus(record.id, "approved")}>Accept</Menu.Item>
              <Menu.Item onClick={() => updateStatus(record.id, "rejected")}>Reject</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          visible={dropdownOpen === record.id}
          onVisibleChange={(visible) => setDropdownOpen(visible ? record.id : null)}
        >
          <Button type="primary">Status</Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Applications</h1>
      <Table dataSource={newApplications} columns={columns} rowKey="id" pagination={{ pageSize: 7 }} />
    </div>
  );
};

export default AppliedStudents;