import { createContext, useContext, useEffect, useState } from "react";
import { getAllCollegesAPI, getAllFilterDataAPI, getAllReviewsAPI } from "../services/allAPI";

const CollegeContext = createContext();

export const CollegeProvider = ({ children }) => {
  const [colleges, setColleges] = useState([]);
  const [location, setLocation] = useState([]);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    setLoading(true);
    try {
      const [collegeData, courseData, reviewData] = await Promise.all([
        getAllCollegesAPI(),
        getAllFilterDataAPI(),
        getAllReviewsAPI()
      ]);

      if (collegeData?.data) setColleges(collegeData.data);
      if (courseData?.data) {
        setCourses(courseData.data.courses || []);
        setLocation(courseData.data.locations || []);
      }
      if (reviewData?.data) setReviews(reviewData.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const refreshColleges = async () => {

    setLoading(true);
    try {
      const [collegeData, courseData, reviewData] = await Promise.all([
        getAllCollegesAPI(),
        getAllFilterDataAPI(),
        getAllReviewsAPI()
      ]);

      if (collegeData?.data) setColleges(collegeData.data);
      if (courseData?.data) {
        setCourses(courseData.data.courses || []);
        setLocation(courseData.data.locations || []);
      }
      if (reviewData?.data) setReviews(reviewData.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CollegeContext.Provider value={{ colleges, courses, location, reviews, loading, error, refreshColleges }}>
      {children}
    </CollegeContext.Provider>
  );
};

export const useCollege = () => useContext(CollegeContext);
