import React, { useState } from "react";
import { submitCollegeApplicationAPI } from "../services/allAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ApplyPop = ({ college, id, setShowPopup, appData }) => {

    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')
    const appliedData = JSON.parse(localStorage.getItem('applied-colleges'))

    const [selectedCourse, setSelectedCourse] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!token) {
            toast.error('Please login first!');
            navigate('/login');
            return;
        }

        if (!selectedCourse || !termsAccepted) {
            toast.error("Please select a course and accept the terms.");
            return;
        }

        const alreadyApplied = appData.some(
            (app) => app.college == id && app.course === parseInt(selectedCourse)
        );

        if (alreadyApplied) {
            toast.error("You have already applied for this course at this college.");
            return;
        }

        const exists = appliedData.some(
            (app) => app.college == id && app.course === parseInt(selectedCourse)
        )

        if (exists) {
            toast.error("You have already applied for this course at this college.");
            return;
        }

        const razorpayLoaded = await loadRazorpay();
        if (!razorpayLoaded) {
            toast.error("Failed to load Razorpay. Please try again.");
            setLoading(false);
            return;
        }

        const course = college.courses.find((c) => c.id == selectedCourse);
        if (!course) {
            toast.error("Selected course not found.");
            return;
        }

        const amount = 300 * 100;

        const options = {
            key: "rzp_test_v5JbppqXvm3HVl",
            amount: amount,
            currency: "INR",
            name: "CourseFinder",
            description: `Application Fee for ${course.name}`,
            image: college.logo,
            handler: async function (response) {
                await applyForCollege(response.razorpay_payment_id);
            },
            prefill: {
                name: "Student Name",
                email: "student@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const applyForCollege = async (paymentId) => {

        const studentData = {
            college: id,
            course: selectedCourse,
            payment_id: paymentId
        };

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const result = await submitCollegeApplicationAPI(studentData, headers);
            console.log(result);

            if (result.status === 201) {
                toast.success("Application submitted successfully!");
                setShowPopup(false);
                navigate('/');
            } else {
                toast.error("Failed to apply. Please try again.");
                console.log(result);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-90 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg shadow-lg w-96 p-5 relative">
                <button
                    onClick={()=>setShowPopup(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
                >
                    ✖
                </button>

                <div className="flex justify-center">
                    <img src={college?.logo} alt={college?.name} className="w-16 h-16 object-cover" />
                </div>

                <div className="text-center mt-3">
                    <h2 className="text-xl font-semibold">{college?.name}</h2>
                    <p className="text-sm text-gray-500">
                        {college?.district}, {college?.state}
                    </p>
                    <p className="text-gray-700 mt-2 text-sm">{college?.description}</p>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Select a Course</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md text-gray-700"
                    >
                        <option value="">-- Choose a Course --</option>
                        {college?.courses?.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name} ({course.duration} years) - ₹{course.fee}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center mt-3">
                    <input
                        id="terms"
                        type="checkbox"
                        required
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        I agree to the{" "}
                        <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                            Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                            Privacy Policy
                        </span>
                    </label>
                </div>

                <button
                    className={`w-full mt-4 py-2 text-white font-semibold rounded ${selectedCourse
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                    disabled={!selectedCourse}
                    onClick={handlePayment}
                >
                    Pay ₹300 & Apply
                </button>
            </div>
        </div>
    );
};

export default ApplyPop;
