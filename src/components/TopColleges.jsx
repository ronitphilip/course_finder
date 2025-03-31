import React from "react";
import { useCollege } from "../context/CollegeContext";
import Pnf from "../pages/Pnf";
import CollegeCard from "./CollegeCard";

const TopColleges = () => {
  
  const { colleges, loading, error } = useCollege();

  if (loading) return <p className="text-center text-xl text-gray-700">Loading colleges...</p>;
  if (error) return <Pnf />;

  // Filter only approved colleges
  const approvedColleges = colleges.filter(college => college.is_approved === true);

  return (
    <section className="text-white">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <h2 className="text-7xl font-bold text-center text-white mb-2">Top Colleges</h2>
        <p className="text-lg text-center text-gray-300 mb-10">
          Discover the best colleges to kickstart your career!
        </p>

        {/* Grid Display - 2 Rows & 4 Columns */}
        {approvedColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approvedColleges.slice(0, 8).map((college) => (
              <CollegeCard key={college.id} college={college} imgheight='h-50' height='h-70'/>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No approved colleges found.</p>
        )}
      </div>
    </section>
  );
};

export default TopColleges;
