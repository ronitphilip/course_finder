import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

// ----------------------------login----------------------------
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login/`, reqBody)
}

// ----------------------------all colleges----------------------------
export const getAllCollegesAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/colleges/`)
}

// ----------------------------filter data----------------------------
export const getAllFilterDataAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/filterdata/`);
}

// ----------------------------particular colleg details----------------------------
export const fetchCollegeDetailsAPI = async (id) => {
    return await commonAPI("GET", `${SERVER_URL}/college/${id}`);
}

// ----------------------------get otp----------------------------
export const getOTPAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/sendotp/`, reqBody)
}

// ----------------------------student registration----------------------------
export const studentRegistrationAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/studentregister/`, reqBody)
}

// ----------------------------college registration----------------------------
export const registerCollegeAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/collegeregister/`, reqBody, { "Content-Type": "multipart/form-data" })
};

// ----------------------------apply to a college----------------------------
export const submitCollegeApplicationAPI = async (reqBody, headers) => {
    return await commonAPI ('POST', `${SERVER_URL}/apply/`, reqBody, { headers } );
}

// ----------------------------list of applied colleges----------------------------
export const appliedCollegesAPI = async (headers) => {
    return await commonAPI ('GET', `${SERVER_URL}/applied-colleges/`, null, { headers } );
}

// ----------------------------add review----------------------------
export const addReviewAPI = async (college_id, reqBody, headers) => {
    return await commonAPI('POST', `${SERVER_URL}/colleges/${college_id}/reviews/`, reqBody, { headers });
}

// ----------------------------fetch reviews----------------------------
export const getReviewAPI = async (college_id) => { 
    return await commonAPI('GET', `${SERVER_URL}/colleges/${college_id}/reviews/`);
}

// ----------------------------fetch student data----------------------------
export const getStudentAPI = async (headers) => { 
    return await commonAPI('GET', `${SERVER_URL}/student/update/`, null, { headers });
}

// ----------------------------update student data----------------------------
export const updateStudentAPI = async (studentData, headers) => { 
    return await commonAPI('PATCH', `${SERVER_URL}/student/update/`, studentData, { headers });
}

// ----------------------------fetch application data----------------------------
export const getApplicationsAPI = async (headers) => { 
    return await commonAPI('GET', `${SERVER_URL}/college/applications/`, null, { headers });
}

// ----------------------------send application status----------------------------
export const updateApplicationAPI = async (applicationId, reqBody, headers) => { 
    return await commonAPI('POST', `${SERVER_URL}/college/application/${applicationId}/update/`, reqBody, { headers });
}

// ----------------------------fetch college data----------------------------
export const getCollegeAPI = async (headers) => { 
    return await commonAPI('GET', `${SERVER_URL}/college/profile/`, null, { headers });
}

// ----------------------------update college data----------------------------
export const updateCollegeAPI = async (studentData, headers) => { 
    return await commonAPI('PATCH', `${SERVER_URL}/college/profile/`, studentData, { headers });
}

// ----------------------------approve college----------------------------
export const approveCollegeAPI = async (college_id, headers) => { 
    return await commonAPI('PATCH', `${SERVER_URL}/college/approve/${college_id}/`, null, { headers });
}

// ----------------------------delete college----------------------------
export const deleteCollegeAPI = async (college_id, headers) => { 
    return await commonAPI('DELETE', `${SERVER_URL}/college/delete/${college_id}/`, null, { headers });
}

// ----------------------------add courses to a college----------------------------
export const addCourseAPI = async (courseData, headers) => { 
    return await commonAPI('POST', `${SERVER_URL}/addcourse/`, courseData, { headers });
};

// ----------------------------fetch courses of a college----------------------------
export const getCoursesAPI = async (headers) => { 
    return await commonAPI('GET', `${SERVER_URL}/courses/`, null, { headers });
}

// ----------------------------update course data----------------------------
export const updateCourseAPI = async (courseId, courseData, headers) => { 
    return await commonAPI('PUT', `${SERVER_URL}/courses/${courseId}/`, courseData, { headers });
}

// ----------------------------delete a course----------------------------
export const deleteCourseAPI = async (courseId, headers) => { 
    return await commonAPI('DELETE', `${SERVER_URL}/courses/${courseId}/`, null, { headers });
}

// ----------------------------fetch all users----------------------------
export const getAllUsersAPI = async (headers) => { 
    return await commonAPI('GET', `${SERVER_URL}/all-users/`, null, { headers });
}

// ----------------------------fetch all reviews----------------------------
export const getAllReviewsAPI = async () => { 
    return await commonAPI('GET', `${SERVER_URL}/all-reviews/`);
}

// ----------------------------submit form from contacts----------------------------
export const submitContactAPI = async (reqBody, headers) => {
    return await commonAPI("POST", `${SERVER_URL}/contact/message/`, reqBody, { headers })
}

// ----------------------------fetch contact froms----------------------------
export const getSubmitedContactAPI = async (headers) => {
    return await commonAPI("GET", `${SERVER_URL}/contact/message/`, null, { headers })
}
