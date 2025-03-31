import React, { useState } from "react";

const AppiledStudents = ({ newApplications, handleStatusUpdate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const updateStatus = async (studentId, newStatus) => {
    await handleStatusUpdate(studentId, newStatus);
    setDropdownOpen(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Applications</h1>

      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-purple-700 text-white">
            <th className="p-3 border border-gray-600">#</th>
            <th className="p-3 border border-gray-600">Student Name</th>
            <th className="p-3 border border-gray-600">Email / Phone</th>
            <th className="p-3 border border-gray-600">Location</th>
            <th className="p-3 border border-gray-600">School & Qualification</th>
            <th className="p-3 border border-gray-600">Course</th>
            <th className="p-3 border border-gray-600">Status</th>
            <th className="p-3 border border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newApplications.map((student, index) => (
            <tr key={student.id} className="text-center border border-gray-600">
              <td className="p-3 border border-gray-600">{index + 1}</td>
              <td className="p-3 border border-gray-600 font-semibold">{student.student_name}</td>
              <td className="p-3 border border-gray-600">
                {student.email} <br /> {student.phone_number}
              </td>
              <td className="p-3 border border-gray-600">
                {student.street}, {student.district}, {student.state}
              </td>
              <td className="p-3 border border-gray-600">
                {student.school_name} <br /> ({student.highest_qualification}, {Math.floor(student.marks_percentage)}%)
              </td>
              <td className="p-3 border border-gray-600">{student.course_name}</td>
              <td
                className={`p-3 border border-gray-600 font-semibold ${
                  student.status === "approved"
                    ? "text-green-400"
                    : student.status === "rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
              </td>
              <td className="p-3 border border-gray-600 relative">
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === student.id ? null : student.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Status
                </button>

                {dropdownOpen === student.id && (
                  <div className="absolute bg-white border rounded-md shadow-lg mt-2 right-0 w-32 z-10">
                    <button
                      onClick={() => updateStatus(student.id, "approved")}
                      className="block w-full text-left px-4 py-2 text-green-600 hover:bg-green-100"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(student.id, "rejected")}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppiledStudents;
