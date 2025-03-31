import React from "react";

const AppliedColleges = ({appliedColleges}) => {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applied Colleges</h1>

      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-purple-700 text-white">
            <th className="p-3 border border-gray-600">#</th>
            <th className="p-3 border border-gray-600">College Name</th>
            <th className="p-3 border border-gray-600">Course</th>
            <th className="p-3 border border-gray-600">Applied Date</th>
            <th className="p-3 border border-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {appliedColleges.map((college, index) => {
            const formattedDate = new Date(college.applied_at).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            );

            const formattedStatus =
              college.status.charAt(0).toUpperCase() + college.status.slice(1);

            return (
              <tr key={college.id} className="text-center border border-gray-600">
                <td className="p-3 border border-gray-600">{index + 1}</td>
                <td className="p-3 border border-gray-600">{college.college_name}</td>
                <td className="p-3 border border-gray-600">{college.course_name}</td>
                <td className="p-3 border border-gray-600">{formattedDate}</td>
                <td
                  className={`p-3 border border-gray-600 font-semibold ${
                    college.status === "approved"
                      ? "text-green-400"
                      : college.status === "rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {formattedStatus}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedColleges;
