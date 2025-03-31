import React from "react";
import { useNavigate } from "react-router-dom";

const CollegeCard = ({ college, imgheight, height }) => {
  const navigate = useNavigate();

  return (
    <>
      <div onClick={() => navigate(`/colleges/${college?.id}`)} className={`${height} bg-gray-900 text-white shadow-white rounded-2xl overflow-hidden transform transition-all hover:scale-105 border`}>
        {/* College Image */}
        <div className={`relative w-full ${imgheight}`}>
          <img src={college?.image} alt={college?.name} className="w-full h-full object-cover" />
        </div>

        {/* College Details */}
        <div className="p-2 flex flex-col items-center text-center h-18">
          <h2 className="text-xl font-semibold">
            {college?.name}
          </h2>
          {college?.street && college?.district && <p>{college?.street}, {college?.district}</p>}
        </div>
      </div>
    </>
  );
};

export default CollegeCard;
