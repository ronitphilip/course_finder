import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle, FaPaperPlane, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addReviewAPI, getReviewAPI } from "../services/allAPI";

const Comments = ({ id, setAverageRating }) => {

    const navigate = useNavigate()

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchReviews()
    }, [id])

    const handleCommentSubmit = async () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            toast.error('Please login to add a review!');
            navigate('/login');
            return;
        }

        if (!comment) {
            toast.error('Enter a review!');
            return;
        }

        if (!rating) {
            toast.error('Please select a star rating');
            return;
        }

        const newComment = {
            review_text: comment,
            rating: rating,
            college: id,
        };

        const header = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        try {
            console.log(id, newComment, header);

            const result = await addReviewAPI(id, newComment, header);
            if (result.status === 201) {
                fetchReviews();
                toast.success('Comment added');
                setComment('');
                setRating(0);
            } else {
                toast.error('Could not add review!')
                console.log(result);
            }
        } catch (err) {
            toast.error('Something went wrong! Try again later.')
        }
    };

    const fetchReviews = async () => {
        try {
            const result = await getReviewAPI(id);
            if (result.status === 200) {
                setComments(result.data);

                const totalReviews = result.data.length;
                const totalRating = result.data.reduce((sum, review) => sum + review.rating, 0);
                const avgRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

                setAverageRating(avgRating);
            } else {
                toast.error('Failed to load comments :(');
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-gray-900 text-white px-10 pb-10">
            <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>

            <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className={`text-2xl cursor-pointer transition ${rating >= star ? "text-yellow-400" : "text-gray-600"}`}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>

            <div className="flex items-center space-x-3 w-220">
                <input type="text" placeholder="Write your comment..." className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    onClick={handleCommentSubmit}
                    className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg shadow-md flex items-center justify-center"
                >
                    <FaPaperPlane className="text-white text-lg" />
                </button>
            </div>

            <div className="mt-6 w-220">
                <h2 className="text-lg font-semibold mb-3">Comments</h2>
                <div className="space-y-4">
                    {comments.length > 0 ? (
                        comments.map((cmt) => (
                            <div key={cmt.id} className="bg-gray-800 p-4 rounded-lg flex items-start justify-between space-x-3">
                                <div className="flex">
                                    <FaUserCircle className="text-gray-400 text-3xl" />
                                    <div className="ms-5">
                                        <div>
                                            <h3 className="text-gray-300 font-semibold">{cmt?.student_name}</h3>
                                            <p className="text-gray-400 text-sm">
                                                {new Date(cmt.created_at).toLocaleDateString("en-US", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </p>
                                        </div>
                                        <p className="text-gray-200 mt-2">{cmt.review_text}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-1 mt-1 me-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={`text-lg ${cmt.rating >= star ? "text-yellow-400" : "text-gray-600"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comments;
