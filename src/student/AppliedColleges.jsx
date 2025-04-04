import React from "react";
import { Table, Tag } from "antd";

const AppliedColleges = ({ appliedColleges }) => {
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "College Name",
      dataIndex: "college_name",
      key: "college_name",
    },
    {
      title: "Course",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Applied Date",
      dataIndex: "applied_at",
      key: "applied_at",
      render: (applied_at) => new Date(applied_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
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
        return <Tag color={statusColors[status] || "blue"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applied Colleges</h1>
      <Table dataSource={appliedColleges} columns={columns} rowKey="id" pagination={{ pageSize: 7 }} />
    </div>
  );
};

export default AppliedColleges;
